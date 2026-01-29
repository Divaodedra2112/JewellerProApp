const functions = require('firebase-functions/v2');
const { onValueCreated } = require('firebase-functions/v2/database');
const admin = require('firebase-admin');
admin.initializeApp();

// Database trigger disabled - using HTTP function instead for better group name support
// exports.sendMessageNotification = onValueCreated(...)

const { onRequest } = require('firebase-functions/v2/https');

// HTTP function to send chat notifications to participants
exports.sendChatNotification = onRequest(async (req, res) => {
  try {
    console.log('[Firebase Function] ============================================');
    console.log('[Firebase Function] 📬 sendChatNotification called');
    console.log('[Firebase Function] Request method:', req.method);
    console.log('[Firebase Function] Request body keys:', Object.keys(req.body || {}));
    
    if (req.method !== 'POST') {
      console.log('[Firebase Function] ❌ Invalid method:', req.method);
      return res.status(405).send('Method Not Allowed');
    }
    
    const { chatId, senderId, message, participants, groupName, mentionedUserIds, type, screen, parentMessageId } = req.body;
    console.log('[Firebase Function] Extracted values:', {
      chatId,
      senderId,
      messageLength: message?.length,
      participantsCount: participants?.length,
      groupName,
      type,
      screen,
      parentMessageId,
    });
    
    if (!chatId || !senderId || !message || !participants) {
      console.log('[Firebase Function] ❌ Missing required fields:', {
        hasChatId: !!chatId,
        hasSenderId: !!senderId,
        hasMessage: !!message,
        hasParticipants: !!participants,
      });
      return res.status(400).send('Missing required fields');
    }
    
    // Determine notification type and screen from request or default to chat
    const notificationType = type || 'chat';
    const notificationScreen = screen || 'ChatThreadScreen';
    console.log('[Firebase Function] Notification settings:', {
      notificationType,
      notificationScreen,
      hasParentMessageId: !!parentMessageId,
    });
    const sender = participants.find(p => String(p.userId) === String(senderId));
    const senderName = sender?.name || 'Someone';
    // Start with client-provided mentioned user IDs
    const mentionedIds = new Set(
      Array.isArray(mentionedUserIds) ? mentionedUserIds.map(x => String(x)) : []
    );

    // Parse @names from message (used as additional signal for safety)
    const normalize = s =>
      String(s)
        .toLowerCase()
        .replace(/[.,!?;:()]+$/g, '')
        .replace(/\s+/g, ' ')
        .trim();
    const nameMentions = new Set();
    if (typeof message === 'string') {
      // Allow optional whitespace after @ (e.g., "@ Admin 2 Admin 2")
      const regex = /@\s*([A-Za-z0-9_. \-]{1,50})/g;
      let m;
      while ((m = regex.exec(message)) !== null) {
        const nm = normalize(m[1] || '');
        if (nm) nameMentions.add(nm);
      }
    }
    // If no IDs provided, derive from names
    if (mentionedIds.size === 0 && nameMentions.size > 0) {
      participants.forEach(p => {
        const nm = normalize(p.name || '');
        if (nm && (nameMentions.has(nm) || Array.from(nameMentions).some(n => nm.startsWith(n)))) {
          mentionedIds.add(String(p.userId));
        }
      });
    }

    // Resolve first mentioned name (if any) for non-mentioned recipients copy
    let firstMentionName = '';
    if (mentionedIds.size > 0 || nameMentions.size > 0) {
      const firstId = Array.from(mentionedIds)[0];
      const m = firstId
        ? participants.find(p => String(p.userId) === firstId)
        : participants.find(p => {
            const nm = normalize(p.name || '');
            return (
              nameMentions.has(nm) ||
              Array.from(nameMentions).some(n => nm.startsWith(n) || nm.includes(n))
            );
          });
      const clean = (m?.name || '').replace(/[.,!?;:()]+$/g, '').trim();
      firstMentionName = clean ? `@${clean}` : '@someone';
    }

    // Build per-recipient messages so we can tailor the body for mentioned vs others
    const messages = [];
    const debug = [];
    for (const p of participants) {
      if (String(p.userId) === String(senderId)) continue;
      const tokens = Array.isArray(p.fcmToken) ? p.fcmToken : [p.fcmToken];
      for (const token of tokens) {
        if (!token || String(token).length <= 10) continue;
        let isMentioned = mentionedIds.has(String(p.userId));
        if (!isMentioned && nameMentions.size > 0) {
          const nm = normalize(p.name || '');
          isMentioned =
            !!nm &&
            (nameMentions.has(nm) ||
              Array.from(nameMentions).some(n => nm.startsWith(n) || nm.includes(n)));
        }
        const title = isMentioned
          ? groupName
            ? `You were mentioned in ${groupName}`
            : 'You were mentioned'
          : groupName
          ? groupName
          : 'New Chat Message';
        const body = isMentioned
          ? `${senderName}: ${message}`
          : mentionedIds.size > 0
          ? `${senderName} mentioned ${firstMentionName}: ${message}`
          : `${senderName}: ${message}`;

        messages.push({
          token,
          notification: {
            title,
            body,
          },
          android: { notification: { sound: 'default' } },
          data: {
            chatId: String(chatId),
            type: notificationType,
            screen: notificationScreen,
            isMentioned: isMentioned ? '1' : '0',
            ...(parentMessageId && { parentMessageId: String(parentMessageId) }),
          },
        });
        debug.push({
          recipientUserId: String(p.userId),
          recipientName: p.name || '',
          isMentioned,
          title,
          body,
        });
      }
    }

    console.log('[Firebase Function] Prepared messages:', {
      totalMessages: messages.length,
      totalParticipants: participants.length,
      messagesWithTokens: messages.filter(m => m.token).length,
    });

    if (messages.length === 0) {
      console.log('[Firebase Function] ⚠️ No valid tokens to send');
      console.log('[Firebase Function] Debug info:', debug);
      return res.status(200).send('No valid tokens to send');
    }

    console.log('[Firebase Function] 🚀 Sending notifications via FCM...');
    const response = await admin.messaging().sendEach(messages);
    console.log('[Firebase Function] ✅ Notifications sent successfully');
    console.log('[Firebase Function] Response:', {
      successCount: response?.successCount,
      failureCount: response?.failureCount,
      responsesCount: response?.responses?.length,
    });
    console.log('[Firebase Function] ============================================');
    return res.status(200).json({ success: true, response, debug });
  } catch (error) {
    console.error('[Firebase Function] ❌ ERROR sending notification:', error);
    console.error('[Firebase Function] Error stack:', error?.stack);
    console.log('[Firebase Function] ============================================');
    return res.status(500).send('Internal Server Error');
  }
});
