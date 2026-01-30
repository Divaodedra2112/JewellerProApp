# Contributing Guide

Thank you for considering contributing to this React Native boilerplate! This document provides guidelines and best practices for contributing.

## 🚀 Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/JewellerProApp.git`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Commit your changes: `git commit -m 'Add some feature'`
6. Push to the branch: `git push origin feature/your-feature-name`
7. Open a Pull Request

## 📝 Code Style

### TypeScript

- Use TypeScript for all new code
- Define types/interfaces for props, state, and API responses
- Avoid `any` type - use `unknown` if type is truly unknown
- Use meaningful type names

```typescript
// Good
interface User {
  id: string;
  name: string;
  email: string;
}

// Bad
const user: any = { id: 1, name: 'John' };
```

### Component Structure

```typescript
// Component file structure
import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

interface Props {
  title: string;
  onPress: () => void;
}

export const MyComponent: React.FC<Props> = ({ title, onPress }) => {
  return (
    <View style={styles.container}>
      <Text>{title}</Text>
    </View>
  );
};
```

### Naming Conventions

- **Components**: PascalCase (e.g., `UserProfile.tsx`)
- **Files**: PascalCase for components, camelCase for utilities
- **Functions**: camelCase (e.g., `getUserData`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)
- **Types/Interfaces**: PascalCase (e.g., `UserProfile`)

### File Organization

```
feature-name/
├── FeatureScreen.tsx    # Main component
├── FeatureService.ts    # API calls
├── FeatureTypes.ts      # TypeScript types
├── FeatureSlice.ts      # Redux slice (if needed)
└── styles.ts            # Component styles
```

## 🧪 Testing

- Write tests for critical business logic
- Test utility functions
- Test Redux slices and actions
- Aim for >80% code coverage on new features

```typescript
// Example test
describe('formatDate', () => {
  it('should format date correctly', () => {
    expect(formatDate('2024-01-01')).toBe('Jan 1, 2024');
  });
});
```

## 📦 Commit Messages

Follow conventional commits:

```
feat: add user authentication
fix: resolve navigation issue
docs: update README
style: format code with prettier
refactor: reorganize service files
test: add unit tests for utils
chore: update dependencies
```

## 🔍 Code Review Checklist

Before submitting a PR, ensure:

- [ ] Code follows TypeScript best practices
- [ ] All tests pass
- [ ] Code is formatted with Prettier
- [ ] No ESLint errors
- [ ] Documentation is updated
- [ ] No console.logs in production code
- [ ] Error handling is implemented
- [ ] Loading states are handled
- [ ] Accessibility is considered

## 🐛 Reporting Issues

When reporting issues, include:

1. **Description**: Clear description of the issue
2. **Steps to Reproduce**: Detailed steps
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Environment**: OS, Node version, React Native version
6. **Screenshots**: If applicable

## 💡 Feature Requests

For feature requests:

1. Check if the feature already exists
2. Explain the use case
3. Describe the expected behavior
4. Consider implementation approach

## 📚 Documentation

- Update README for new features
- Add JSDoc comments for complex functions
- Update type definitions
- Add examples for new components

## ✅ Pull Request Process

1. Ensure all checks pass
2. Request review from maintainers
3. Address review comments
4. Keep PR focused and small
5. Update documentation

## 🙏 Thank You!

Your contributions make this project better for everyone!


