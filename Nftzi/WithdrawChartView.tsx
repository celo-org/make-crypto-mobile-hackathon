import React, {memo} from 'react';
import {VictoryPie} from "victory-native";
import {View} from "react-native";

interface Props {
  readonly value: number
  readonly color: string
  readonly containerHeight: number
  readonly height: number
}

export const WithdrawChartView: React.FC<Props> = memo((props) => {
  return (
    <View style={{height: props.containerHeight, width: '100%', position: 'absolute'}}>
      <VictoryPie
        height={props.height}
        width={props.height}
        horizontal
        padding={{top: 0, left: 0, right: 0, bottom: 0}}
        padAngle={({ datum }) => 2}
        cornerRadius={({ datum }) => 10}
        innerRadius={props.height * 0.42}
        startAngle={90}
        endAngle={-90}
        animate={{duration: 250}}
        colorScale={[props.color, 'transparent'].reverse()}
        data={[{ y: props.value, label: ' '}, {y: 1 - props.value, label: ' '}].reverse()}
      />
    </View>
  )
});
