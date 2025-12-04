import { useState, useMemo } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView, LayoutChangeEvent, TextInput } from 'react-native';
import Svg, { Path, Line, Text as SvgText, Circle, G, Rect } from 'react-native-svg';
import { calculateGreeks, blackScholes, BlackScholesParams } from '@trading-edu/shared';

type GreekType = 'delta' | 'gamma' | 'theta' | 'vega' | 'rho';

const CHART_HEIGHT = 220;
const PADDING = { top: 20, right: 20, bottom: 40, left: 50 };

// 生成 Greek 曲線數據
function generateGreekData(
  strike: number,
  daysToExpiry: number,
  iv: number,
  rate: number,
  greekType: GreekType
): { price: number; call: number; put: number }[] {
  const T = daysToExpiry / 365;
  const data: { price: number; call: number; put: number }[] = [];

  for (let price = strike * 0.7; price <= strike * 1.3; price += strike * 0.03) {
    const params: BlackScholesParams = {
      S: price,
      K: strike,
      T,
      r: rate,
      sigma: iv,
    };

    const callGreeks = calculateGreeks(params, 'call');
    const putGreeks = calculateGreeks(params, 'put');

    data.push({
      price: Math.round(price * 100) / 100,
      call: Math.round(callGreeks[greekType] * 10000) / 10000,
      put: Math.round(putGreeks[greekType] * 10000) / 10000,
    });
  }

  return data;
}

const greekInfo: Record<GreekType, { name: string; nameCn: string; symbol: string; color: string; description: string }> = {
  delta: { 
    name: 'Delta', 
    nameCn: '德爾塔', 
    symbol: 'Δ', 
    color: '#3b82f6',
    description: '期權價格對標的價格變化的敏感度'
  },
  gamma: { 
    name: 'Gamma', 
    nameCn: '伽馬', 
    symbol: 'Γ', 
    color: '#8b5cf6',
    description: 'Delta 對標的價格變化的敏感度'
  },
  theta: { 
    name: 'Theta', 
    nameCn: '西塔', 
    symbol: 'Θ', 
    color: '#f59e0b',
    description: '每日時間衰減'
  },
  vega: { 
    name: 'Vega', 
    nameCn: '維加', 
    symbol: 'ν', 
    color: '#10b981',
    description: '期權價格對波動率變化的敏感度'
  },
  rho: { 
    name: 'Rho', 
    nameCn: '柔', 
    symbol: 'ρ', 
    color: '#06b6d4',
    description: '期權價格對利率變化的敏感度'
  },
};

interface GreeksVisualizerProps {
  defaultStrike?: number;
  defaultDaysToExpiry?: number;
  defaultIV?: number;
  defaultRate?: number;
}

// 數字輸入組件
function NumberInput({
  label,
  value,
  onChange,
  min,
  max,
  step,
  suffix = '',
  prefix = '',
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  suffix?: string;
  prefix?: string;
}) {
  const [inputValue, setInputValue] = useState(value.toString());

  const handleChange = (text: string) => {
    setInputValue(text);
    const num = parseFloat(text);
    if (!isNaN(num) && num >= min && num <= max) {
      onChange(num);
    }
  };

  const handleBlur = () => {
    const num = parseFloat(inputValue);
    if (isNaN(num) || num < min) {
      setInputValue(min.toString());
      onChange(min);
    } else if (num > max) {
      setInputValue(max.toString());
      onChange(max);
    } else {
      setInputValue(num.toString());
      onChange(num);
    }
  };

  const increment = () => {
    const newValue = Math.min(value + step, max);
    setInputValue(newValue.toString());
    onChange(newValue);
  };

  const decrement = () => {
    const newValue = Math.max(value - step, min);
    setInputValue(newValue.toString());
    onChange(newValue);
  };

  return (
    <View style={styles.numberInputContainer}>
      <Text style={styles.numberInputLabel}>{label}</Text>
      <View style={styles.numberInputRow}>
        <Pressable style={styles.stepButton} onPress={decrement}>
          <Text style={styles.stepButtonText}>−</Text>
        </Pressable>
        <View style={styles.inputWrapper}>
          {prefix ? <Text style={styles.inputPrefix}>{prefix}</Text> : null}
          <TextInput
            style={styles.numberInput}
            value={inputValue}
            onChangeText={handleChange}
            onBlur={handleBlur}
            keyboardType="numeric"
            selectTextOnFocus
          />
          {suffix ? <Text style={styles.inputSuffix}>{suffix}</Text> : null}
        </View>
        <Pressable style={styles.stepButton} onPress={increment}>
          <Text style={styles.stepButtonText}>+</Text>
        </Pressable>
      </View>
    </View>
  );
}

// 簡單的 SVG 折線圖組件
function SimpleLineChart({ 
  data, 
  width, 
  height, 
  callColor = '#10b981', 
  putColor = '#ef4444',
  strike 
}: { 
  data: { price: number; call: number; put: number }[];
  width: number;
  height: number;
  callColor?: string;
  putColor?: string;
  strike: number;
}) {
  if (data.length === 0 || width <= 0) return null;

  const chartWidth = width - PADDING.left - PADDING.right;
  const chartHeight = height - PADDING.top - PADDING.bottom;

  if (chartWidth <= 0 || chartHeight <= 0) return null;

  // 計算數據範圍
  const prices = data.map(d => d.price);
  const allValues = [...data.map(d => d.call), ...data.map(d => d.put)];
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const minValue = Math.min(...allValues);
  const maxValue = Math.max(...allValues);
  const valueRange = maxValue - minValue || 1;
  const priceRange = maxPrice - minPrice || 1;

  // 縮放函數
  const scaleX = (price: number) => 
    PADDING.left + ((price - minPrice) / priceRange) * chartWidth;
  const scaleY = (value: number) => 
    PADDING.top + chartHeight - ((value - minValue) / valueRange) * chartHeight;

  // 生成路徑
  const createPath = (values: number[]) => {
    return data.map((d, i) => {
      const x = scaleX(d.price);
      const y = scaleY(values[i]);
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
    }).join(' ');
  };

  const callPath = createPath(data.map(d => d.call));
  const putPath = createPath(data.map(d => d.put));

  // Y軸刻度
  const yTicks = 5;
  const yTickValues = Array.from({ length: yTicks }, (_, i) => 
    minValue + (valueRange * i) / (yTicks - 1)
  );

  // X軸刻度
  const xTicks = 5;
  const xTickValues = Array.from({ length: xTicks }, (_, i) => 
    minPrice + (priceRange * i) / (xTicks - 1)
  );

  return (
    <Svg width={width} height={height}>
      {/* 背景 */}
      <Rect x={0} y={0} width={width} height={height} fill="#0a0e17" />
      
      {/* 背景網格 */}
      {yTickValues.map((tick, i) => (
        <Line
          key={`grid-y-${i}`}
          x1={PADDING.left}
          y1={scaleY(tick)}
          x2={width - PADDING.right}
          y2={scaleY(tick)}
          stroke="#1e293b"
          strokeWidth={1}
          strokeDasharray="3,3"
        />
      ))}

      {/* 零線（如果在範圍內） */}
      {minValue <= 0 && maxValue >= 0 && (
        <Line
          x1={PADDING.left}
          y1={scaleY(0)}
          x2={width - PADDING.right}
          y2={scaleY(0)}
          stroke="#64748b"
          strokeWidth={1}
        />
      )}

      {/* 行權價線 */}
      <Line
        x1={scaleX(strike)}
        y1={PADDING.top}
        x2={scaleX(strike)}
        y2={height - PADDING.bottom}
        stroke="#f59e0b"
        strokeWidth={1}
        strokeDasharray="5,5"
      />
      <SvgText
        x={scaleX(strike)}
        y={PADDING.top - 5}
        fill="#f59e0b"
        fontSize={10}
        textAnchor="middle"
      >
        ATM
      </SvgText>

      {/* Call 曲線 */}
      <Path
        d={callPath}
        stroke={callColor}
        strokeWidth={2}
        fill="none"
      />

      {/* Put 曲線 */}
      <Path
        d={putPath}
        stroke={putColor}
        strokeWidth={2}
        fill="none"
      />

      {/* Y軸 */}
      <Line
        x1={PADDING.left}
        y1={PADDING.top}
        x2={PADDING.left}
        y2={height - PADDING.bottom}
        stroke="#1e293b"
        strokeWidth={1}
      />

      {/* Y軸刻度標籤 */}
      {yTickValues.map((tick, i) => (
        <SvgText
          key={`y-label-${i}`}
          x={PADDING.left - 5}
          y={scaleY(tick) + 3}
          fill="#64748b"
          fontSize={9}
          textAnchor="end"
        >
          {tick.toFixed(2)}
        </SvgText>
      ))}

      {/* X軸 */}
      <Line
        x1={PADDING.left}
        y1={height - PADDING.bottom}
        x2={width - PADDING.right}
        y2={height - PADDING.bottom}
        stroke="#1e293b"
        strokeWidth={1}
      />

      {/* X軸刻度標籤 */}
      {xTickValues.map((tick, i) => (
        <SvgText
          key={`x-label-${i}`}
          x={scaleX(tick)}
          y={height - PADDING.bottom + 15}
          fill="#64748b"
          fontSize={9}
          textAnchor="middle"
        >
          ${tick.toFixed(0)}
        </SvgText>
      ))}

      {/* 圖例 */}
      <G transform={`translate(${width - 80}, ${PADDING.top})`}>
        <Rect x={0} y={0} width={65} height={40} fill="#111827" rx={4} />
        <Circle cx={12} cy={12} r={4} fill={callColor} />
        <SvgText x={22} y={16} fill="#94a3b8" fontSize={10}>Call</SvgText>
        <Circle cx={12} cy={28} r={4} fill={putColor} />
        <SvgText x={22} y={32} fill="#94a3b8" fontSize={10}>Put</SvgText>
      </G>
    </Svg>
  );
}

export default function GreeksVisualizer({
  defaultStrike = 100,
  defaultDaysToExpiry = 30,
  defaultIV = 0.25,
  defaultRate = 0.05,
}: GreeksVisualizerProps) {
  const [selectedGreek, setSelectedGreek] = useState<GreekType>('delta');
  const [strike, setStrike] = useState(defaultStrike);
  const [daysToExpiry, setDaysToExpiry] = useState(defaultDaysToExpiry);
  const [iv, setIV] = useState(defaultIV * 100); // 以百分比顯示
  const [showControls, setShowControls] = useState(false);
  const [chartWidth, setChartWidth] = useState(300);

  // 計算當前參數下的期權價格
  const prices = useMemo(() => {
    const params: BlackScholesParams = {
      S: strike,
      K: strike,
      T: daysToExpiry / 365,
      r: defaultRate,
      sigma: iv / 100,
    };
    return blackScholes(params);
  }, [strike, daysToExpiry, iv]);

  // 計算當前 Greeks
  const currentGreeks = useMemo(() => {
    const params: BlackScholesParams = {
      S: strike,
      K: strike,
      T: daysToExpiry / 365,
      r: defaultRate,
      sigma: iv / 100,
    };
    return {
      call: calculateGreeks(params, 'call'),
      put: calculateGreeks(params, 'put'),
    };
  }, [strike, daysToExpiry, iv]);

  // 生成圖表數據
  const chartData = useMemo(() => {
    return generateGreekData(strike, daysToExpiry, iv / 100, defaultRate, selectedGreek);
  }, [strike, daysToExpiry, iv, selectedGreek]);

  // 獲取容器寬度
  const onChartLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    if (width > 0) {
      setChartWidth(width);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>希臘字母視覺化</Text>
          <Text style={styles.subtitle}>Greeks Visualizer</Text>
        </View>
        <Pressable
          style={[styles.toggleButton, showControls && styles.toggleButtonActive]}
          onPress={() => setShowControls(!showControls)}
        >
          <Text style={[styles.toggleButtonText, showControls && styles.toggleButtonTextActive]}>
            {showControls ? '隱藏控制' : '調整參數'}
          </Text>
        </Pressable>
      </View>

      {/* Greek Selection */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.greekSelectorScroll}>
        <View style={styles.greekSelector}>
          {(Object.keys(greekInfo) as GreekType[]).map((greek) => (
            <Pressable
              key={greek}
              style={[
                styles.greekButton,
                selectedGreek === greek && styles.greekButtonActive
              ]}
              onPress={() => setSelectedGreek(greek)}
            >
              <Text style={[
                styles.greekButtonText,
                selectedGreek === greek && styles.greekButtonTextActive
              ]}>
                {greekInfo[greek].symbol} {greekInfo[greek].name}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      {/* Greek Info */}
      <View style={[styles.infoBox, { borderLeftColor: greekInfo[selectedGreek].color }]}>
        <Text style={styles.infoTitle}>
          {greekInfo[selectedGreek].name} ({greekInfo[selectedGreek].nameCn})
        </Text>
        <Text style={styles.infoDescription}>
          {greekInfo[selectedGreek].description}
        </Text>
      </View>

      {/* Current Greek Values */}
      <View style={styles.greekValuesRow}>
        <View style={[styles.greekValueBox, { backgroundColor: 'rgba(16, 185, 129, 0.1)' }]}>
          <Text style={styles.greekValueLabel}>Call {greekInfo[selectedGreek].symbol}</Text>
          <Text style={[styles.greekValueText, { color: '#10b981' }]}>
            {currentGreeks.call[selectedGreek].toFixed(4)}
          </Text>
        </View>
        <View style={[styles.greekValueBox, { backgroundColor: 'rgba(239, 68, 68, 0.1)' }]}>
          <Text style={styles.greekValueLabel}>Put {greekInfo[selectedGreek].symbol}</Text>
          <Text style={[styles.greekValueText, { color: '#ef4444' }]}>
            {currentGreeks.put[selectedGreek].toFixed(4)}
          </Text>
        </View>
      </View>

      {/* Current Values */}
      <View style={styles.valuesRow}>
        <View style={styles.valueBox}>
          <Text style={styles.valueLabel}>行權價</Text>
          <Text style={styles.valueText}>${strike}</Text>
        </View>
        <View style={styles.valueBox}>
          <Text style={styles.valueLabel}>到期天數</Text>
          <Text style={styles.valueText}>{daysToExpiry}天</Text>
        </View>
        <View style={styles.valueBox}>
          <Text style={styles.valueLabel}>IV</Text>
          <Text style={styles.valueText}>{iv.toFixed(0)}%</Text>
        </View>
        <View style={styles.valueBox}>
          <Text style={styles.valueLabel}>期權價</Text>
          <Text style={[styles.valueText, { color: '#f59e0b' }]}>
            ${prices.call.toFixed(2)}
          </Text>
        </View>
      </View>

      {/* Chart */}
      <View style={styles.chartContainer} onLayout={onChartLayout}>
        <Text style={styles.chartTitle}>{greekInfo[selectedGreek].name} vs 股價</Text>
        <SimpleLineChart
          data={chartData}
          width={chartWidth}
          height={CHART_HEIGHT}
          strike={strike}
        />
      </View>

      {/* Interactive Controls - 使用數字輸入 */}
      {showControls && (
        <View style={styles.controls}>
          <Text style={styles.controlsTitle}>參數調整</Text>
          
          <NumberInput
            label="行權價 (Strike)"
            value={strike}
            onChange={setStrike}
            min={10}
            max={500}
            step={5}
            prefix="$"
          />

          <NumberInput
            label="到期天數 (DTE)"
            value={daysToExpiry}
            onChange={setDaysToExpiry}
            min={1}
            max={365}
            step={1}
            suffix=" 天"
          />

          <NumberInput
            label="隱含波動率 (IV)"
            value={iv}
            onChange={setIV}
            min={5}
            max={200}
            step={5}
            suffix="%"
          />

          {/* 快捷預設 */}
          <View style={styles.presetsContainer}>
            <Text style={styles.presetsLabel}>快捷預設</Text>
            <View style={styles.presetsRow}>
              <Pressable 
                style={styles.presetButton}
                onPress={() => { setStrike(100); setDaysToExpiry(30); setIV(25); }}
              >
                <Text style={styles.presetButtonText}>標準</Text>
              </Pressable>
              <Pressable 
                style={styles.presetButton}
                onPress={() => { setStrike(100); setDaysToExpiry(7); setIV(30); }}
              >
                <Text style={styles.presetButtonText}>週期權</Text>
              </Pressable>
              <Pressable 
                style={styles.presetButton}
                onPress={() => { setStrike(100); setDaysToExpiry(90); setIV(20); }}
              >
                <Text style={styles.presetButtonText}>季度</Text>
              </Pressable>
              <Pressable 
                style={styles.presetButton}
                onPress={() => { setStrike(100); setDaysToExpiry(30); setIV(60); }}
              >
                <Text style={styles.presetButtonText}>高波動</Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1f2e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  title: {
    color: '#f1f5f9',
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#64748b',
    fontSize: 12,
    marginTop: 2,
  },
  toggleButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#111827',
  },
  toggleButtonActive: {
    backgroundColor: '#f59e0b',
  },
  toggleButtonText: {
    color: '#64748b',
    fontSize: 12,
  },
  toggleButtonTextActive: {
    color: '#0a0e17',
  },
  greekSelectorScroll: {
    marginBottom: 12,
  },
  greekSelector: {
    flexDirection: 'row',
    gap: 8,
  },
  greekButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#111827',
  },
  greekButtonActive: {
    backgroundColor: '#f59e0b',
  },
  greekButtonText: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '500',
  },
  greekButtonTextActive: {
    color: '#0a0e17',
  },
  infoBox: {
    backgroundColor: '#111827',
    borderLeftWidth: 4,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  infoTitle: {
    color: '#f1f5f9',
    fontSize: 14,
    fontWeight: '600',
  },
  infoDescription: {
    color: '#94a3b8',
    fontSize: 12,
    marginTop: 4,
  },
  greekValuesRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  greekValueBox: {
    flex: 1,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  greekValueLabel: {
    color: '#64748b',
    fontSize: 11,
  },
  greekValueText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4,
  },
  valuesRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  valueBox: {
    flex: 1,
    backgroundColor: '#111827',
    borderRadius: 8,
    padding: 8,
    marginHorizontal: 2,
    alignItems: 'center',
  },
  valueLabel: {
    color: '#64748b',
    fontSize: 10,
  },
  valueText: {
    color: '#f1f5f9',
    fontSize: 12,
    fontWeight: '600',
  },
  chartContainer: {
    backgroundColor: '#0a0e17',
    borderRadius: 8,
    overflow: 'hidden',
  },
  chartTitle: {
    color: '#64748b',
    fontSize: 11,
    textAlign: 'center',
    paddingTop: 8,
  },
  controls: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#1e293b',
  },
  controlsTitle: {
    color: '#f1f5f9',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 16,
  },
  // 數字輸入組件樣式
  numberInputContainer: {
    marginBottom: 16,
  },
  numberInputLabel: {
    color: '#64748b',
    fontSize: 12,
    marginBottom: 8,
  },
  numberInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepButton: {
    width: 44,
    height: 44,
    backgroundColor: '#111827',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepButtonText: {
    color: '#f59e0b',
    fontSize: 24,
    fontWeight: '300',
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0a0e17',
    borderRadius: 8,
    marginHorizontal: 8,
    height: 44,
    paddingHorizontal: 12,
  },
  inputPrefix: {
    color: '#94a3b8',
    fontSize: 16,
    marginRight: 4,
  },
  inputSuffix: {
    color: '#94a3b8',
    fontSize: 16,
    marginLeft: 4,
  },
  numberInput: {
    color: '#f1f5f9',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    minWidth: 60,
    padding: 0,
  },
  // 預設按鈕樣式
  presetsContainer: {
    marginTop: 8,
  },
  presetsLabel: {
    color: '#64748b',
    fontSize: 12,
    marginBottom: 8,
  },
  presetsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  presetButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#111827',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#1e293b',
  },
  presetButtonText: {
    color: '#94a3b8',
    fontSize: 12,
  },
});
