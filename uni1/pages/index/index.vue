<template>
	<view>
		<button @tap="chooseImage">上传图片</button>
		<button @tap="chooseVideo">上传视频</button>
		<view class="image_wrap" v-for="(image,index) in imageList" :key="index">
			<image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage"></image>
		</view>
		
		<view class="video_wrap" v-for="(video,index) in videoList" :key="index">
			<video class="uni-uploader__img" :src="video" :data-src="video" control></video>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				imageList: [],
				videoList: []
			}
		},
		onUnload() {

		},
		methods: {
			chooseVideo() {
				uni.chooseVideo({
					camera:['back', 'front'],
					sourceType: ['camera', 'album'],
					success: (res) => {
						console.log(res)
						this.videoList.push(res.tempFilePath);
						// this.src = res.tempFilePath
					}
				})
			},
			
			chooseImage: async function() {
				if (this.imageList.length === 9) {
					let isContinue = await this.isFullImg();
					console.log("是否继续?", isContinue);
					if (!isContinue) {
						return;
					}
				}
				uni.chooseImage({
					sourceType: ['camera', 'album'],
					sizeType: ['compressed', 'original'],
					count: 9,
					success: (res) => {
						console.log(res)
						this.imageList = this.imageList.concat(res.tempFilePaths);
						// this.chooseImage();
					}
				})
			},
			previewImage: function(e) {
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.imageList
				})
			}
		}
	}
</script>

<style>
	.cell-pd {
		padding: 22upx 30upx;
	}

	.list-pd {
		margin-top: 50upx;
	}
	
	.image_wrap {
		width: 90%;
		height: auto;
		margin: 5px auto;
	}
	
	.image_wrap image {
		width: 100%;
		height: 200px;
	}
	
	.video_wrap {
		width: 90%;
		height: auto;
		margin: 5px auto;
	}
	
	.video_wrap video {
		width: 100%;
		height: 200px;
	}
</style>
