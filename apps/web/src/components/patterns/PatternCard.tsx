'use client';

import { CheckCircle2, AlertTriangle, Target, Zap, Activity } from 'lucide-react';

export interface PatternCardProps {
  id: string;
  title: string;
  titleEn: string;
  type: 'reversal' | 'continuation' | 'short-term';
  trend: 'bullish' | 'bearish' | 'both';
  definition: string;
  characteristics: string[];
  volumeProfile: string;
  reliability: {
    conditions: string[];
    commonPitfalls: string[];
  };
  tradingStrategies: string[];
  keyInsights?: string[];
  // 移除 patternData，改用圖片
  imageUrl?: string;
}

export default function PatternCard({
  id,
  title,
  titleEn,
  type,
  trend,
  definition,
  characteristics,
  volumeProfile,
  reliability,
  tradingStrategies,
  keyInsights,
  imageUrl,
}: PatternCardProps) {
  // 趨勢配置
  const trendConfig = {
    bullish: {
      label: '看漲',
      icon: Activity,
      color: 'bg-green-500/10 text-green-400 border-green-500/30',
      gradient: 'from-green-500/20 to-emerald-500/20',
    },
    bearish: {
      label: '看跌',
      icon: Activity,
      color: 'bg-red-500/10 text-red-400 border-red-500/30',
      gradient: 'from-red-500/20 to-rose-500/20',
    },
    both: {
      label: '雙向',
      icon: Activity,
      color: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
      gradient: 'from-blue-500/20 to-indigo-500/20',
    },
  };

  const config = trendConfig[trend];
  const TrendIcon = config.icon;

  // 型態類型標籤
  const typeLabel = {
    reversal: '反轉型態',
    continuation: '連續型態',
    'short-term': '短期型態',
  };

  // 使用預設的示意圖（暫時用顏色塊代替）
  const getPatternIllustration = () => {
    return (
      <div className="w-full h-64 bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-primary)] rounded-lg border border-[var(--border-color)] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">{trend === 'bullish' ? '📈' : trend === 'bearish' ? '📉' : '📊'}</div>
          <p className="text-sm text-[var(--text-muted)]">{title} 型態示意圖</p>
          <p className="text-xs text-[var(--text-muted)] mt-2">圖表即將更新</p>
        </div>
      </div>
    );
  };

  return (
    <div id={id} className="scroll-mt-24 mb-16">
      <div className="bg-[var(--bg-card)] border-2 border-[var(--border-color)] rounded-2xl overflow-hidden hover:border-[var(--accent-gold)]/30 transition-colors">
        {/* Header */}
        <div className={`relative p-6 bg-gradient-to-br ${config.gradient}`}>
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-card)]/50 to-transparent"></div>
          
          <div className="relative flex flex-wrap items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-2xl font-bold text-[var(--text-primary)]">
                  {title}
                </h3>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--bg-secondary)] text-[var(--text-muted)] border border-[var(--border-color)]">
                  {typeLabel[type]}
                </span>
              </div>
              <p className="text-sm text-[var(--text-muted)] mb-3">{titleEn}</p>
              <p className="text-base text-[var(--text-secondary)] leading-relaxed">
                {definition}
              </p>
            </div>
            
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border ${config.color}`}>
              <TrendIcon className="w-4 h-4" />
              <span>{config.label}</span>
            </div>
          </div>
        </div>

        {/* 圖表 */}
        <div className="p-6 bg-[var(--bg-secondary)]">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={`${title}型態示意圖`}
              className="w-full h-auto rounded-lg border border-[var(--border-color)]"
            />
          ) : (
            getPatternIllustration()
          )}
        </div>

        {/* 內容區塊 */}
        <div className="p-6 space-y-6">
          {/* 關鍵洞察（如果有） */}
          {keyInsights && keyInsights.length > 0 && (
            <div className="bg-gradient-to-r from-[var(--accent-gold)]/5 to-transparent border-l-4 border-[var(--accent-gold)] p-4 rounded-r-lg">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-[var(--accent-gold)] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-[var(--text-primary)] mb-2">關鍵洞察</h4>
                  <ul className="space-y-1">
                    {keyInsights.map((insight, i) => (
                      <li key={i} className="text-sm text-[var(--text-secondary)]">
                        • {insight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* 兩欄佈局 */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* 左欄 */}
            <div className="space-y-6">
              {/* 型態特徵 */}
              <div>
                <h4 className="text-lg font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[var(--accent-gold)]" />
                  型態特徵
                </h4>
                <ul className="space-y-2">
                  {characteristics.map((char, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)] mt-1.5 flex-shrink-0"></span>
                      <span>{char}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 成交量特徵 */}
              <div>
                <h4 className="text-lg font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-400" />
                  成交量分析
                </h4>
                <div className="text-sm text-[var(--text-secondary)] leading-relaxed bg-[var(--bg-secondary)] p-4 rounded-lg border border-[var(--border-color)] whitespace-pre-line">
                  {volumeProfile}
                </div>
              </div>
            </div>

            {/* 右欄 */}
            <div className="space-y-6">
              {/* 可靠性準則 */}
              <div>
                <h4 className="text-lg font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  可靠性條件
                </h4>
                <ul className="space-y-2">
                  {reliability.conditions.map((condition, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>{condition}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 常見陷阱 */}
              <div>
                <h4 className="text-lg font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  常見陷阱
                </h4>
                <ul className="space-y-2">
                  {reliability.commonPitfalls.map((pitfall, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                      <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                      <span>{pitfall}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* 交易策略（全寬） */}
          <div className="pt-6 border-t border-[var(--border-color)]">
            <h4 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-[var(--accent-gold)]" />
              交易策略
            </h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {tradingStrategies.map((strategy, i) => (
                <div
                  key={i}
                  className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg p-4 hover:border-[var(--accent-gold)]/50 transition-colors"
                >
                  <p className="text-sm text-[var(--text-secondary)]">{strategy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
