'use client';

import { useState } from 'react';

type PatternType = 
  | 'head-shoulders' 
  | 'inverse-head-shoulders'
  | 'double-top' 
  | 'double-bottom'
  | 'triangle-ascending'
  | 'triangle-descending'
  | 'triangle-symmetric'
  | 'flag-bullish'
  | 'flag-bearish'
  | 'wedge-rising'
  | 'wedge-falling'
  | 'cup-handle';

interface Annotation {
  x: number;
  y: number;
  label: string;
  labelPosition?: 'top' | 'bottom' | 'left' | 'right';
}

interface PatternDiagramProps {
  type: PatternType;
  width?: number;
  height?: number;
  showAnnotations?: boolean;
  interactive?: boolean;
}

// 形態數據配置
const patternConfigs: Record<PatternType, {
  name: string;
  nameCn: string;
  path: string;
  annotations: Annotation[];
  neckline?: { x1: number; y1: number; x2: number; y2: number };
  trendlines?: { x1: number; y1: number; x2: number; y2: number; dashed?: boolean }[];
  isReversal: boolean;
  direction: 'bullish' | 'bearish';
}> = {
  'head-shoulders': {
    name: 'Head and Shoulders',
    nameCn: '頭肩頂',
    path: 'M 20,150 L 50,100 L 80,130 L 110,50 L 140,130 L 170,100 L 200,150 L 250,180',
    annotations: [
      { x: 50, y: 90, label: '左肩', labelPosition: 'top' },
      { x: 110, y: 40, label: '頭部', labelPosition: 'top' },
      { x: 170, y: 90, label: '右肩', labelPosition: 'top' },
      { x: 140, y: 145, label: '頸線', labelPosition: 'bottom' },
    ],
    neckline: { x1: 80, y1: 130, x2: 200, y2: 150 },
    isReversal: true,
    direction: 'bearish',
  },
  'inverse-head-shoulders': {
    name: 'Inverse Head and Shoulders',
    nameCn: '頭肩底',
    path: 'M 20,50 L 50,100 L 80,70 L 110,150 L 140,70 L 170,100 L 200,50 L 250,20',
    annotations: [
      { x: 50, y: 110, label: '左肩', labelPosition: 'bottom' },
      { x: 110, y: 160, label: '頭部', labelPosition: 'bottom' },
      { x: 170, y: 110, label: '右肩', labelPosition: 'bottom' },
      { x: 140, y: 55, label: '頸線', labelPosition: 'top' },
    ],
    neckline: { x1: 80, y1: 70, x2: 200, y2: 50 },
    isReversal: true,
    direction: 'bullish',
  },
  'double-top': {
    name: 'Double Top',
    nameCn: '雙頂',
    path: 'M 20,150 L 60,50 L 100,100 L 140,50 L 180,100 L 220,150 L 260,180',
    annotations: [
      { x: 60, y: 40, label: '第一頂', labelPosition: 'top' },
      { x: 140, y: 40, label: '第二頂', labelPosition: 'top' },
      { x: 100, y: 115, label: '頸線', labelPosition: 'bottom' },
    ],
    neckline: { x1: 20, y1: 100, x2: 260, y2: 100 },
    isReversal: true,
    direction: 'bearish',
  },
  'double-bottom': {
    name: 'Double Bottom',
    nameCn: '雙底',
    path: 'M 20,50 L 60,150 L 100,100 L 140,150 L 180,100 L 220,50 L 260,20',
    annotations: [
      { x: 60, y: 160, label: '第一底', labelPosition: 'bottom' },
      { x: 140, y: 160, label: '第二底', labelPosition: 'bottom' },
      { x: 100, y: 85, label: '頸線', labelPosition: 'top' },
    ],
    neckline: { x1: 20, y1: 100, x2: 260, y2: 100 },
    isReversal: true,
    direction: 'bullish',
  },
  'triangle-ascending': {
    name: 'Ascending Triangle',
    nameCn: '上升三角形',
    path: 'M 20,150 L 50,70 L 80,120 L 110,70 L 140,100 L 170,70 L 200,85 L 230,70 L 260,30',
    annotations: [
      { x: 140, y: 55, label: '阻力線', labelPosition: 'top' },
      { x: 100, y: 140, label: '上升支撐', labelPosition: 'bottom' },
    ],
    trendlines: [
      { x1: 50, y1: 70, x2: 230, y2: 70, dashed: false },
      { x1: 20, y1: 150, x2: 200, y2: 85, dashed: false },
    ],
    isReversal: false,
    direction: 'bullish',
  },
  'triangle-descending': {
    name: 'Descending Triangle',
    nameCn: '下降三角形',
    path: 'M 20,50 L 50,130 L 80,80 L 110,130 L 140,100 L 170,130 L 200,115 L 230,130 L 260,170',
    annotations: [
      { x: 140, y: 145, label: '支撐線', labelPosition: 'bottom' },
      { x: 100, y: 60, label: '下降阻力', labelPosition: 'top' },
    ],
    trendlines: [
      { x1: 50, y1: 130, x2: 230, y2: 130, dashed: false },
      { x1: 20, y1: 50, x2: 200, y2: 115, dashed: false },
    ],
    isReversal: false,
    direction: 'bearish',
  },
  'triangle-symmetric': {
    name: 'Symmetric Triangle',
    nameCn: '對稱三角形',
    path: 'M 20,100 L 50,50 L 80,130 L 110,70 L 140,110 L 170,85 L 200,95 L 230,90 L 280,30',
    annotations: [
      { x: 100, y: 45, label: '下降阻力', labelPosition: 'top' },
      { x: 100, y: 140, label: '上升支撐', labelPosition: 'bottom' },
    ],
    trendlines: [
      { x1: 50, y1: 50, x2: 230, y2: 90, dashed: false },
      { x1: 80, y1: 130, x2: 200, y2: 95, dashed: false },
    ],
    isReversal: false,
    direction: 'bullish',
  },
  'flag-bullish': {
    name: 'Bullish Flag',
    nameCn: '牛旗形態',
    path: 'M 20,180 L 60,50 L 80,70 L 100,60 L 120,80 L 140,70 L 160,90 L 180,80 L 220,20',
    annotations: [
      { x: 40, y: 110, label: '旗桿', labelPosition: 'left' },
      { x: 130, y: 55, label: '旗面', labelPosition: 'top' },
    ],
    trendlines: [
      { x1: 60, y1: 50, x2: 180, y2: 80, dashed: false },
      { x1: 80, y1: 70, x2: 160, y2: 90, dashed: false },
    ],
    isReversal: false,
    direction: 'bullish',
  },
  'flag-bearish': {
    name: 'Bearish Flag',
    nameCn: '熊旗形態',
    path: 'M 20,20 L 60,150 L 80,130 L 100,140 L 120,120 L 140,130 L 160,110 L 180,120 L 220,180',
    annotations: [
      { x: 40, y: 90, label: '旗桿', labelPosition: 'left' },
      { x: 130, y: 145, label: '旗面', labelPosition: 'bottom' },
    ],
    trendlines: [
      { x1: 60, y1: 150, x2: 180, y2: 120, dashed: false },
      { x1: 80, y1: 130, x2: 160, y2: 110, dashed: false },
    ],
    isReversal: false,
    direction: 'bearish',
  },
  'wedge-rising': {
    name: 'Rising Wedge',
    nameCn: '上升楔形',
    path: 'M 20,180 L 60,120 L 90,150 L 130,100 L 160,120 L 200,80 L 230,95 L 280,150',
    annotations: [
      { x: 150, y: 75, label: '上軌', labelPosition: 'top' },
      { x: 150, y: 155, label: '下軌', labelPosition: 'bottom' },
    ],
    trendlines: [
      { x1: 60, y1: 120, x2: 200, y2: 80, dashed: false },
      { x1: 90, y1: 150, x2: 230, y2: 95, dashed: false },
    ],
    isReversal: true,
    direction: 'bearish',
  },
  'wedge-falling': {
    name: 'Falling Wedge',
    nameCn: '下降楔形',
    path: 'M 20,20 L 60,80 L 90,50 L 130,100 L 160,80 L 200,120 L 230,105 L 280,50',
    annotations: [
      { x: 150, y: 125, label: '下軌', labelPosition: 'bottom' },
      { x: 150, y: 45, label: '上軌', labelPosition: 'top' },
    ],
    trendlines: [
      { x1: 60, y1: 80, x2: 200, y2: 120, dashed: false },
      { x1: 90, y1: 50, x2: 230, y2: 105, dashed: false },
    ],
    isReversal: true,
    direction: 'bullish',
  },
  'cup-handle': {
    name: 'Cup and Handle',
    nameCn: '杯柄形態',
    path: 'M 20,50 Q 60,50 80,100 Q 120,180 160,100 Q 180,50 200,50 L 210,70 L 230,60 L 260,20',
    annotations: [
      { x: 120, y: 170, label: '杯底', labelPosition: 'bottom' },
      { x: 220, y: 75, label: '杯柄', labelPosition: 'right' },
      { x: 100, y: 40, label: '阻力線', labelPosition: 'top' },
    ],
    neckline: { x1: 20, y1: 50, x2: 230, y2: 60 },
    isReversal: false,
    direction: 'bullish',
  },
};

export default function PatternDiagram({
  type,
  width = 300,
  height = 200,
  showAnnotations = true,
  interactive = false,
}: PatternDiagramProps) {
  const [hoveredAnnotation, setHoveredAnnotation] = useState<string | null>(null);
  const config = patternConfigs[type];

  if (!config) {
    return (
      <div className="flex items-center justify-center h-40 bg-[var(--bg-secondary)] rounded-lg">
        <span className="text-[var(--text-muted)]">形態未定義</span>
      </div>
    );
  }

  const viewBox = `0 0 ${width} ${height}`;
  const scale = width / 280;

  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="font-semibold text-[var(--text-primary)]">{config.nameCn}</h4>
          <p className="text-xs text-[var(--text-muted)]">{config.name}</p>
        </div>
        <div className={`px-2 py-1 rounded text-xs font-medium ${
          config.direction === 'bullish' 
            ? 'bg-[var(--profit)]/10 text-[var(--profit)]' 
            : 'bg-[var(--loss)]/10 text-[var(--loss)]'
        }`}>
          {config.direction === 'bullish' ? '看漲' : '看跌'}
          {config.isReversal ? ' (反轉)' : ' (持續)'}
        </div>
      </div>

      {/* SVG Diagram */}
      <svg
        viewBox={viewBox}
        className="w-full"
        style={{ height: height * scale }}
      >
        {/* Background Grid */}
        <defs>
          <pattern id={`grid-${type}`} width="20" height="20" patternUnits="userSpaceOnUse">
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke="var(--border-color)"
              strokeWidth="0.5"
              opacity="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${type})`} />

        {/* Trendlines */}
        {config.trendlines?.map((line, i) => (
          <line
            key={`trendline-${i}`}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="var(--accent-blue)"
            strokeWidth="1.5"
            strokeDasharray={line.dashed ? '5,5' : undefined}
            opacity="0.7"
          />
        ))}

        {/* Neckline */}
        {config.neckline && (
          <line
            x1={config.neckline.x1}
            y1={config.neckline.y1}
            x2={config.neckline.x2}
            y2={config.neckline.y2}
            stroke="var(--accent-gold)"
            strokeWidth="2"
            strokeDasharray="5,5"
          />
        )}

        {/* Price Path */}
        <path
          d={config.path}
          fill="none"
          stroke={config.direction === 'bullish' ? 'var(--profit)' : 'var(--loss)'}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Annotations */}
        {showAnnotations && config.annotations.map((annotation, i) => {
          const isHovered = hoveredAnnotation === annotation.label;
          const labelOffset = {
            top: { x: 0, y: -12 },
            bottom: { x: 0, y: 18 },
            left: { x: -10, y: 4 },
            right: { x: 10, y: 4 },
          }[annotation.labelPosition || 'top'];

          return (
            <g
              key={`annotation-${i}`}
              className={interactive ? 'cursor-pointer' : ''}
              onMouseEnter={() => interactive && setHoveredAnnotation(annotation.label)}
              onMouseLeave={() => interactive && setHoveredAnnotation(null)}
            >
              {/* Dot */}
              <circle
                cx={annotation.x}
                cy={annotation.y}
                r={isHovered ? 6 : 4}
                fill="var(--accent-gold)"
                className="transition-all duration-200"
              />
              
              {/* Label */}
              <text
                x={annotation.x + labelOffset.x}
                y={annotation.y + labelOffset.y}
                textAnchor="middle"
                fill="var(--text-secondary)"
                fontSize="10"
                fontWeight={isHovered ? '600' : '400'}
                className="transition-all duration-200"
              >
                {annotation.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-4 text-xs text-[var(--text-muted)]">
        <div className="flex items-center gap-2">
          <div className={`w-4 h-0.5 ${config.direction === 'bullish' ? 'bg-[var(--profit)]' : 'bg-[var(--loss)]'}`}></div>
          <span>價格走勢</span>
        </div>
        {config.neckline && (
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-[var(--accent-gold)]" style={{ borderStyle: 'dashed' }}></div>
            <span>頸線</span>
          </div>
        )}
        {config.trendlines && (
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-[var(--accent-blue)]"></div>
            <span>趨勢線</span>
          </div>
        )}
      </div>
    </div>
  );
}

// 導出可用的形態類型
export const availablePatterns = Object.keys(patternConfigs) as PatternType[];
export type { PatternType };

