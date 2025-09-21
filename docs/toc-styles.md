```
/* VuePress Theme Hope 目录位置调整样式 */

/* 方案一：固定在右侧 */
.vp-toc-placeholder {
  /* 移除默认的占位符样式 */
  position: fixed !important;
  top: 100px; /* 距离顶部的距离 */
  right: 20px; /* 距离右侧的距离 */
  width: 240px; /* 目录宽度 */
  height: auto;
  max-height: calc(100vh - 120px); /* 最大高度，避免超出屏幕 */
  z-index: 10;
  
  /* 确保不影响页面布局 */
  margin: 0;
  padding: 0;
}

#toc {
  position: static !important;
  background: var(--vp-c-bg-soft, #f8f8f8);
  border: 1px solid var(--vp-c-divider, #e2e8f0);
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8px);
  max-height: calc(100vh - 140px);
  overflow-y: auto;
}

/* 目录标题样式 */
.vp-toc-header {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1, #2c3e50);
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--vp-c-divider-light, #f0f0f0);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 目录列表样式 */
.vp-toc-wrapper {
  .vp-toc-list {
    margin: 0;
    padding: 0;
    list-style: none;
    
    .vp-toc-item {
      margin: 4px 0;
      
      .vp-toc-link {
        display: block;
        padding: 4px 8px;
        text-decoration: none;
        border-radius: 4px;
        font-size: 13px;
        line-height: 1.4;
        color: var(--vp-c-text-2, #476582);
        transition: all 0.2s ease;
        
        &:hover {
          background: var(--vp-c-default-soft, #f1f5f9);
          color: var(--vp-c-brand, #3eaf7c);
        }
        
        &.active {
          background: var(--vp-c-brand-soft, #e6f7ff);
          color: var(--vp-c-brand, #3eaf7c);
          font-weight: 500;
        }
        
        /* 不同层级的缩进 */
        &.level2 {
          padding-left: 8px;
        }
        
        &.level3 {
          padding-left: 24px;
          font-size: 12px;
        }
        
        &.level4 {
          padding-left: 40px;
          font-size: 11px;
        }
      }
    }
    
    /* 嵌套列表样式 */
    ul.vp-toc-list {
      margin-left: 0;
      padding-left: 0;
    }
  }
}

/* 目录标记器（当前位置指示器）*/
.vp-toc-marker {
  position: absolute;
  left: 0;
  width: 2px;
  height: 20px;
  background: var(--vp-c-brand, #3eaf7c);
  border-radius: 1px;
  transition: top 0.3s ease;
  opacity: 0.8;
}

/* 打印按钮样式 */
.print-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  color: var(--vp-c-text-3, #8492a6);
  transition: all 0.2s ease;
  
  &:hover {
    background: var(--vp-c-default-soft, #f1f5f9);
    color: var(--vp-c-text-1, #2c3e50);
  }
  
  .print-icon {
    width: 16px;
    height: 16px;
  }
}

/* 响应式设计 */
@media (max-width: 1280px) {
  .vp-toc-placeholder {
    display: none; /* 在较小屏幕上隐藏 */
  }
}

/* 确保主内容区域给目录留出空间 */
@media (min-width: 1281px) {
  .vp-doc {
    margin-right: 280px; /* 为右侧目录留出空间 */
  }
}

/* 方案二：顶部横向显示 */
/*
.vp-toc-placeholder {
  position: static;
  width: 100%;
  margin-bottom: 20px;
}

#toc {
  background: var(--vp-c-bg-soft, #f8f8f8);
  border: 1px solid var(--vp-c-divider, #e2e8f0);
  border-radius: 8px;
  padding: 16px;
}

.vp-toc-wrapper {
  .vp-toc-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    
    .vp-toc-item {
      margin: 0;
      
      .vp-toc-link {
        display: inline-block;
        padding: 6px 12px;
        background: var(--vp-c-default-soft, #f1f5f9);
        border-radius: 16px;
        font-size: 12px;
        
        &.level3 {
          padding-left: 12px;
        }
      }
    }
  }
}
*/

/* 方案三：左侧固定显示 */
/*
.vp-toc-placeholder {
  position: fixed !important;
  top: 100px;
  left: 20px;
  width: 240px;
  z-index: 10;
}

@media (min-width: 1281px) {
  .vp-doc {
    margin-left: 280px;
    margin-right: 0;
  }
}
*/

/* 滚动条样式优化 */
#toc::-webkit-scrollbar {
  width: 4px;
}

#toc::-webkit-scrollbar-track {
  background: transparent;
}

#toc::-webkit-scrollbar-thumb {
  background: var(--vp-c-divider, #e2e8f0);
  border-radius: 2px;
}

#toc::-webkit-scrollbar-thumb:hover {
  background: var(--vp-c-text-3, #8492a6);
}

/* 动画效果 */
.vp-toc-placeholder {
  animation: slideInRight 0.3s ease-out;
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* 暗黑模式适配 */
@media (prefers-color-scheme: dark) {
  #toc {
    background: var(--vp-c-bg-soft, #1e1e20);
    border-color: var(--vp-c-divider, #2e2e32);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
  
  .vp-toc-header {
    color: var(--vp-c-text-1, #ffffff);
    border-bottom-color: var(--vp-c-divider-light, #2e2e32);
  }
}
```