---
title: 获取相册
category:
  - 跨平台框架
tag:
  - uni-app
order: 7
---

# uni-app 获取安卓/iOS 相册

## uni-app 获取android相册

```js
getImageList() {
                let imageList = []
                let MediaStore = plus.android.importClass('android.provider.MediaStore');
                let photoColumns= [
                        MediaStore.Images.Media._ID,
                        MediaStore.Images.Media.DATA,
                        MediaStore.Images.Media.DATE_ADDED
                    ]
                let main = plus.android.runtimeMainActivity();
                let resolver = main.getContentResolver();
                plus.android.importClass(resolver);
                let cursor=resolver.query(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, photoColumns, null, null, null)
                plus.android.importClass(cursor);
                while (cursor.moveToNext()) {
                    let _id = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Images.Media._ID))
                    let filePath = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DATA))
                    let dateAdded = cursor.getLong(cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DATE_ADDED))
                    imageList.push({
                        filePath: filePath,
                        dateAdded: dateAdded
                    })
                }
                cursor.close()
                return imageList
            }
```