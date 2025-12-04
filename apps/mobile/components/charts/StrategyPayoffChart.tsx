import React, { useState, useMemo } from 'react';
import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import Svg, { Path, Line, Text as SvgText, Rect, G, Circle } from 'react-native-svg';
import { Plus, Minus, Settings2 } from 'lucide-react-native';
import { generatePayoffData, StrategyLeg, THEME_COLORS } from '@trading-edu/shared';

const PADDING = { top: 20, right: 20, bottom: 40, left: 50 };

interface StrategyPayoffChartProps {
  legs: StrategyLeg[];
  title?: string;
  showStock?: boolean;
  centerPrice?: number;
}

export default function StrategyPayoffChart({
  legs,
  title,
  showStock = false,
  centerPrice = 100,
}: StrategyPayoffChartProps) {
  const [showControls, setShowControls] = useState(false);
  const [chartWidth, setChartWidth] = useState(0);
  const [adjustedLegs, setAdjustedLegs] = useState<StrategyLeg[]>(legs);
  const [stockPosition, setStockPosition] = useState(showStock ? 100 : 0); // 股票數量（每100股）
  const [stockCost, setStockCost] = useState(centerPrice);

  const handleLayout = (event: any) => {
    setChartWidth(event.nativeEvent.layout.width);
  };

  // 計算圖表數據
  const chartData = useMemo(() => {
    const allLegs = [...adjustedLegs];
    
    // 如果有股票持倉，添加股票的損益
    if (stockPosition > 0) {
      // 股票不是期權，需要特別處理
      const data = generatePayoffData(allLegs, centerPrice, 0.3, 80);
      return data.map(point => ({
        ...point,
        payoff: point.payoff + (point.price - stockCost) * stockPosition,
      }));
    }
    
    return generatePayoffData(allLegs, centerPrice, 0.3, 80);
  }, [adjustedLegs, centerPrice, stockPosition, stockCost]);

  const chartHeight = 200;

  // 更新單腿參數
  const updateLegStrike = (index: number, newStrike: number) => {
    const newLegs = [...adjustedLegs];
    newLegs[index] = { ...newLegs[index], strike: Math.max(1, newStrike) };
    setAdjustedLegs(newLegs);
  };

  const updateLegPremium = (index: number, newPremium: number) => {
    const newLegs = [...adjustedLegs];
    newLegs[index] = { ...newLegs[index], premium: Math.max(0, newPremium) };
    setAdjustedLegs(newLegs);
  };

  // 重置參數
  const resetParams = () => {
    setAdjustedLegs(legs);
    setStockPosition(showStock ? 100 : 0);
    setStockCost(centerPrice);
  };

  if (chartWidth <= 0) {
    return <View style={styles.container} onLayout={handleLayout} />;
  }

  const width = chartWidth;
  const height = chartHeight;
  const chartW = width - PADDING.left - PADDING.right;
  const chartH = height - PADDING.top - PADDING.bottom;

  // 計算數據範圍
  const prices = chartData.map(d => d.price);
  const payoffs = chartData.map(d => d.payoff);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const minPayoff = Math.min(...payoffs);
  const maxPayoff = Math.max(...payoffs);

  const priceRange = maxPrice - minPrice || 1;
  const payoffRange = Math.max(Math.abs(maxPayoff), Math.abs(minPayoff)) * 2 || 1;
  const midPayoff = 0;

  // 縮放函數
  const scaleX = (price: number) =>
    PADDING.left + ((price - minPrice) / priceRange) * chartW;
  const scaleY = (payoff: number) =>
    PADDING.top + chartH / 2 - (payoff / payoffRange) * chartH;

  // 生成路徑
  const pathD = chartData.map((d, i) => {
    const x = scaleX(d.price);
    const y = scaleY(d.payoff);
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  // Y軸刻度
  const yTicks = 5;
  const yTickValues = Array.from({ length: yTicks }, (_, i) => {
    const range = Math.max(Math.abs(maxPayoff), Math.abs(minPayoff));
    return -range + (range * 2 * i) / (yTicks - 1);
  });

  // X軸刻度
  const xTicks = 5;
  const xTickValues = Array.from({ length: xTicks }, (_, i) =>
    minPrice + (priceRange * i) / (xTicks - 1)
  );

  // 找出關鍵價位（行權價）
  const strikes = [...new Set(adjustedLegs.map(l => l.strike))].sort((a, b) => a - b);

  return (
    <View style={styles.container} onLayout={handleLayout}>
      {/* 標題和控制按鈕 */}
      <View style={styles.header}>
        <Text style={styles.title}>{title || '損益圖'}</Text>
        <Pressable
          onPress={() => setShowControls(!showControls)}
          style={[styles.controlButton, showControls && styles.controlButtonActive]}
        >
          <Settings2 size={16} color={showControls ? THEME_COLORS.bgPrimary : THEME_COLORS.textSecondary} />
          <Text style={[styles.controlButtonText, showControls && styles.controlButtonTextActive]}>
            調整參數
          </Text>
        </Pressable>
      </View>

      {/* 圖表 */}
      <View style={styles.chartWrapper}>
        <Svg width={width} height={height}>
          {/* 背景 */}
          <Rect
            x={PADDING.left}
            y={PADDING.top}
            width={chartW}
            height={chartH}
            fill={THEME_COLORS.bgPrimary}
          />

          {/* 網格線 */}
          {yTickValues.map((tick, i) => (
            <Line
              key={`grid-y-${i}`}
              x1={PADDING.left}
              y1={scaleY(tick)}
              x2={width - PADDING.right}
              y2={scaleY(tick)}
              stroke={THEME_COLORS.borderColor}
              strokeWidth={0.5}
              strokeDasharray="3,3"
            />
          ))}

          {/* 零線 */}
          <Line
            x1={PADDING.left}
            y1={scaleY(0)}
            x2={width - PADDING.right}
            y2={scaleY(0)}
            stroke={THEME_COLORS.textMuted}
            strokeWidth={1}
          />

          {/* 行權價線 */}
          {strikes.map((strike, i) => (
            <G key={`strike-${i}`}>
              <Line
                x1={scaleX(strike)}
                y1={PADDING.top}
                x2={scaleX(strike)}
                y2={height - PADDING.bottom}
                stroke={THEME_COLORS.accentGold}
                strokeWidth={1}
                strokeDasharray="5,5"
              />
              <SvgText
                x={scaleX(strike)}
                y={PADDING.top - 5}
                fill={THEME_COLORS.accentGold}
                fontSize={10}
                textAnchor="middle"
              >
                K=${strike}
              </SvgText>
            </G>
          ))}

          {/* 損益曲線 */}
          <Path
            d={pathD}
            stroke={THEME_COLORS.accentBlue}
            strokeWidth={2.5}
            fill="none"
          />

          {/* 填充區域 */}
          {chartData.length > 0 && (
            <>
              {/* 獲利區域 (綠色) */}
              <Path
                d={`${pathD} L ${scaleX(chartData[chartData.length - 1].price)} ${scaleY(0)} L ${scaleX(chartData[0].price)} ${scaleY(0)} Z`}
                fill="url(#profitGradient)"
                opacity={0.3}
              />
            </>
          )}

          {/* Y軸標籤 */}
          {yTickValues.map((tick, i) => (
            <SvgText
              key={`y-label-${i}`}
              x={PADDING.left - 5}
              y={scaleY(tick) + 4}
              fill={THEME_COLORS.textMuted}
              fontSize={10}
              textAnchor="end"
            >
              ${tick.toFixed(0)}
            </SvgText>
          ))}

          {/* X軸標籤 */}
          {xTickValues.map((tick, i) => (
            <SvgText
              key={`x-label-${i}`}
              x={scaleX(tick)}
              y={height - PADDING.bottom + 15}
              fill={THEME_COLORS.textMuted}
              fontSize={10}
              textAnchor="middle"
            >
              ${tick.toFixed(0)}
            </SvgText>
          ))}

          {/* 圖例 */}
          <G x={PADDING.left + 5} y={PADDING.top + 5}>
            <Rect x={0} y={0} width={10} height={3} fill={THEME_COLORS.accentBlue} />
            <SvgText x={15} y={4} fill={THEME_COLORS.textPrimary} fontSize={10}>到期損益</SvgText>
          </G>
        </Svg>
      </View>

      {/* 參數調整區 */}
      {showControls && (
        <View style={styles.controlsContainer}>
          <View style={styles.controlsHeader}>
            <Text style={styles.controlsTitle}>參數調整</Text>
            <Pressable onPress={resetParams} style={styles.resetButton}>
              <Text style={styles.resetButtonText}>重置</Text>
            </Pressable>
          </View>

          {/* 股票持倉（如果有） */}
          {showStock && (
            <View style={styles.paramGroup}>
              <Text style={styles.paramLabel}>股票持倉</Text>
              <View style={styles.paramRow}>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>數量</Text>
                  <View style={styles.inputControl}>
                    <Pressable 
                      onPress={() => setStockPosition(Math.max(0, stockPosition - 100))}
                      style={styles.incDecButton}
                    >
                      <Minus size={14} color={THEME_COLORS.textPrimary} />
                    </Pressable>
                    <TextInput
                      style={styles.numericInput}
                      keyboardType="numeric"
                      value={stockPosition.toString()}
                      onChangeText={(text) => setStockPosition(Math.max(0, parseInt(text) || 0))}
                    />
                    <Pressable 
                      onPress={() => setStockPosition(stockPosition + 100)}
                      style={styles.incDecButton}
                    >
                      <Plus size={14} color={THEME_COLORS.textPrimary} />
                    </Pressable>
                  </View>
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>成本價</Text>
                  <View style={styles.inputControl}>
                    <Pressable 
                      onPress={() => setStockCost(Math.max(1, stockCost - 1))}
                      style={styles.incDecButton}
                    >
                      <Minus size={14} color={THEME_COLORS.textPrimary} />
                    </Pressable>
                    <TextInput
                      style={styles.numericInput}
                      keyboardType="numeric"
                      value={stockCost.toString()}
                      onChangeText={(text) => setStockCost(Math.max(1, parseFloat(text) || 1))}
                    />
                    <Pressable 
                      onPress={() => setStockCost(stockCost + 1)}
                      style={styles.incDecButton}
                    >
                      <Plus size={14} color={THEME_COLORS.textPrimary} />
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          )}

          {/* 期權腿參數 */}
          {adjustedLegs.map((leg, index) => (
            <View key={index} style={styles.paramGroup}>
              <View style={styles.legHeader}>
                <View style={[
                  styles.legBadge,
                  { backgroundColor: leg.position === 'long' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)' }
                ]}>
                  <Text style={[
                    styles.legBadgeText,
                    { color: leg.position === 'long' ? '#10b981' : '#ef4444' }
                  ]}>
                    {leg.position === 'long' ? '買入' : '賣出'} {leg.type.toUpperCase()}
                  </Text>
                </View>
              </View>
              <View style={styles.paramRow}>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>行權價</Text>
                  <View style={styles.inputControl}>
                    <Pressable 
                      onPress={() => updateLegStrike(index, leg.strike - 5)}
                      style={styles.incDecButton}
                    >
                      <Minus size={14} color={THEME_COLORS.textPrimary} />
                    </Pressable>
                    <TextInput
                      style={styles.numericInput}
                      keyboardType="numeric"
                      value={leg.strike.toString()}
                      onChangeText={(text) => updateLegStrike(index, parseFloat(text) || 100)}
                    />
                    <Pressable 
                      onPress={() => updateLegStrike(index, leg.strike + 5)}
                      style={styles.incDecButton}
                    >
                      <Plus size={14} color={THEME_COLORS.textPrimary} />
                    </Pressable>
                  </View>
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>權利金</Text>
                  <View style={styles.inputControl}>
                    <Pressable 
                      onPress={() => updateLegPremium(index, leg.premium - 0.5)}
                      style={styles.incDecButton}
                    >
                      <Minus size={14} color={THEME_COLORS.textPrimary} />
                    </Pressable>
                    <TextInput
                      style={styles.numericInput}
                      keyboardType="numeric"
                      value={leg.premium.toFixed(1)}
                      onChangeText={(text) => updateLegPremium(index, parseFloat(text) || 0)}
                    />
                    <Pressable 
                      onPress={() => updateLegPremium(index, leg.premium + 0.5)}
                      style={styles.incDecButton}
                    >
                      <Plus size={14} color={THEME_COLORS.textPrimary} />
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME_COLORS.bgSecondary,
    borderRadius: 12,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: THEME_COLORS.borderColor,
  },
  title: {
    color: THEME_COLORS.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
  controlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: THEME_COLORS.bgPrimary,
  },
  controlButtonActive: {
    backgroundColor: THEME_COLORS.accentGold,
  },
  controlButtonText: {
    color: THEME_COLORS.textSecondary,
    fontSize: 12,
    marginLeft: 4,
  },
  controlButtonTextActive: {
    color: THEME_COLORS.bgPrimary,
  },
  chartWrapper: {
    padding: 8,
  },
  controlsContainer: {
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: THEME_COLORS.borderColor,
    backgroundColor: THEME_COLORS.bgPrimary,
  },
  controlsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  controlsTitle: {
    color: THEME_COLORS.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
  resetButton: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: THEME_COLORS.bgSecondary,
  },
  resetButtonText: {
    color: THEME_COLORS.textMuted,
    fontSize: 12,
  },
  paramGroup: {
    marginBottom: 12,
  },
  paramLabel: {
    color: THEME_COLORS.textPrimary,
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 8,
  },
  legHeader: {
    marginBottom: 8,
  },
  legBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  legBadgeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  paramRow: {
    flexDirection: 'row',
    gap: 12,
  },
  inputGroup: {
    flex: 1,
  },
  inputLabel: {
    color: THEME_COLORS.textMuted,
    fontSize: 11,
    marginBottom: 4,
  },
  inputControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME_COLORS.bgSecondary,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: THEME_COLORS.borderColor,
  },
  incDecButton: {
    padding: 8,
  },
  numericInput: {
    flex: 1,
    color: THEME_COLORS.textPrimary,
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
    paddingVertical: 6,
  },
});

