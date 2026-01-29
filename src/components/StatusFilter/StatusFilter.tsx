import React from 'react';
import { Text, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from './StatusFilter.style';


interface StatusFilter {
id:number;
name:string;
fontColor:string;
backgroundColor:string;
icon:string;
statusCategory:string;
}

interface StatusFilterProps {
  options: StatusFilter[];
  selected: number | undefined;
  onChange: (value: number) => void;
}

export const StatusFilter: React.FC<StatusFilterProps> = ({ options, selected, onChange }) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.container}>
      {/* Dynamic options */}

      <TouchableOpacity
        key={0}
        onPress={() => onChange(0)}
        style={[
          styles.button,
          selected === 0 ? styles.activeButton : styles.inactiveButton
        ]}
      >
        <Text style={[selected === 0 ? styles.activeLabel : styles.inactiveLabel]}>
          All
        </Text>
      </TouchableOpacity>

      {options.map(({ id, name }) => {
        const isActive = selected === id;
        return (
          <TouchableOpacity
            key={id}
            onPress={() => onChange(id)}
            style={[
              styles.button,
              isActive ? styles.activeButton : styles.inactiveButton
            ]}
          >
            <Text style={[isActive ? styles.activeLabel : styles.inactiveLabel]}>
              {name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};