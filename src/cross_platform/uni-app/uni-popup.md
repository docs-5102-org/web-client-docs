---
title: uni-popup 使用指南
category:
  - 跨平台框架
tag:
  - uni-app
  - uni-popup
order: 3
---

# uni-popup 使用指南

### 设置圆角，需要在标签上去掉背景色，然后在slot 区域加css圆角代码即可

```
<uni-popup ref="pinglunDetailPopup" :animation="true"  @change="change">
   <view :style="pinglunDetailPopupStyle">
                <comment-detail
                    :commentObj="commentObj"
                    @close="$refs.pinglunDetailPopup.close()"
                    @renderCommentDetailTempReplyTarget="renderCommentDetailTempReplyTarget">
                </comment-detail>
            </view>
</uni-popup>

computed:{
            pinglunDetailPopupStyle(){
                return uni.$b.addStyle({
                    width: '750rpx',
                    height: (this.windowHeight  *  2/3 ) * 2 + 'rpx',
                    overflow: 'auto',
                    'background-color': '#ffffff',
                    'border-top-left-radius': '20rpx',
                    'border-top-right-radius': '20rpx'
                });
            }
        },
```
