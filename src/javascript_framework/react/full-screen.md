---
title: 全屏的功能实现
category:
  - react
date: 2025-09-20
---

# 全屏的功能实现

```ts
import React, { useState, useEffect, useCallback } from 'react';
import { Tooltip } from 'antd';
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons';

interface FullScreenProps {
  className?: string;
  style?: React.CSSProperties;
}

export const FullScreen: React.FC<FullScreenProps> = ({ className, style }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  // 检查当前是否处于全屏状态
  const checkFullScreenStatus = useCallback(() => {
    const fullscreenElement = 
      document.fullscreenElement || 
      (document as any).mozFullScreenElement || 
      (document as any).webkitFullscreenElement || 
      (document as any).msFullscreenElement;
    
    return !!fullscreenElement;
  }, []);

  // 进入全屏
  const requestFullScreen = useCallback(async () => {
    const element = document.documentElement;
    
    try {
      if (element.requestFullscreen) {
        await element.requestFullscreen();
      } else if ((element as any).mozRequestFullScreen) {
        await (element as any).mozRequestFullScreen();
      } else if ((element as any).webkitRequestFullScreen) {
        await (element as any).webkitRequestFullScreen();
      } else if ((element as any).msRequestFullscreen) {
        await (element as any).msRequestFullscreen();
      }
    } catch (error) {
      console.error('进入全屏失败:', error);
    }
  }, []);

  // 退出全屏
  const exitFullscreen = useCallback(async () => {
    try {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else if ((document as any).mozCancelFullScreen) {
        await (document as any).mozCancelFullScreen();
      } else if ((document as any).webkitCancelFullScreen) {
        await (document as any).webkitCancelFullScreen();
      } else if ((document as any).msExitFullscreen) {
        await (document as any).msExitFullscreen();
      }
    } catch (error) {
      console.error('退出全屏失败:', error);
    }
  }, []);

  // 切换全屏状态
  const toggleFullScreen = useCallback(async () => {
    if (!document.fullscreenEnabled) {
      console.warn('当前浏览器不支持全屏模式');
      return;
    }

    const currentFullScreenStatus = checkFullScreenStatus();
    
    if (currentFullScreenStatus) {
      await exitFullscreen();
    } else {
      await requestFullScreen();
    }
  }, [checkFullScreenStatus, exitFullscreen, requestFullScreen]);

  // 监听全屏状态变化
  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(checkFullScreenStatus());
    };

    // 添加各种浏览器的全屏状态监听事件
    const events = [
      'fullscreenchange',
      'mozfullscreenchange',
      'webkitfullscreenchange',
      'msfullscreenchange'
    ];

    events.forEach(event => {
      document.addEventListener(event, handleFullScreenChange);
    });

    // 初始化状态
    setIsFullScreen(checkFullScreenStatus());

    // 清理事件监听器
    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleFullScreenChange);
      });
    };
  }, [checkFullScreenStatus]);

  // 处理键盘事件 (可选：ESC键退出全屏的额外处理)
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isFullScreen) {
        // ESC键已经会自动退出全屏，这里只是更新状态
        // 实际状态更新会通过fullscreenchange事件处理
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isFullScreen]);

  return (
    <Tooltip 
      placement="bottom" 
      title={isFullScreen ? '退出全屏' : '进入全屏'}
    >
      <div
        className={className}
        style={{ 
          cursor: 'pointer', 
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...style 
        }}
        onClick={toggleFullScreen}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleFullScreen();
          }
        }}
        aria-label={isFullScreen ? '退出全屏' : '进入全屏'}>
        {isFullScreen ? (
          <FullscreenExitOutlined />
        ) : (
          <FullscreenOutlined />
        )}
      </div>
    </Tooltip>
  );
};
```

