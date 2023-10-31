# Project Contents

## components

* [assets/](./components/assets)
  * [Avatars.jsx](./components/assets/Avatars.jsx)
  * [Scripts.jsx](./components/assets/Scripts.jsx)
  * [Videos.jsx](./components/assets/Videos.jsx)
  * [Voiceovers.jsx](./components/assets/Voiceovers.jsx)
* [auth/](./components/auth)
  * [TikTok/](./components/auth/TikTok)
    * [ConnectButton.jsx](./components/auth/TikTok/ConnectButton.jsx)
    * [checkAccessToken.js](./components/auth/TikTok/checkAccessToken.js)
  * [signout/](./components/auth/signout)
    * [index.js](./components/auth/signout/index.js)
  * [AccountForm.jsx](./components/auth/AccountForm.jsx)
  * [AuthForm.jsx](./components/auth/AuthForm.jsx)
  * [Avatar.jsx](./components/auth/Avatar.jsx)
  * [SignOut.jsx](./components/auth/SignOut.jsx)
* [creators/](./components/creators)
  * [did/](./components/creators/did)
    * [DID.jsx](./components/creators/did/DID.jsx)
    * [LiveStream.jsx](./components/creators/did/LiveStream.jsx)
    * [createStream.js](./components/creators/did/createStream.js)
  * [replicate/](./components/creators/replicate)
    * [Img2Img.jsx](./components/creators/replicate/Img2Img.jsx)
    * [ModelSelect.jsx](./components/creators/replicate/ModelSelect.jsx)
    * [Txt2Img.jsx](./components/creators/replicate/Txt2Img.jsx)
  * [xilabs/](./components/creators/xilabs)
    * [ElevenLabs.jsx](./components/creators/xilabs/ElevenLabs.jsx)
    * [VoiceModelSelector.jsx](./components/creators/xilabs/VoiceModelSelector.jsx)
    * [XilabsVoiceovers.jsx](./components/creators/xilabs/XilabsVoiceovers.jsx)
* [shared/](./components/shared)
  * [imageGallery/](./components/shared/imageGallery)
    * [Card.jsx](./components/shared/imageGallery/Card.jsx)
    * [Pagination.jsx](./components/shared/imageGallery/Pagination.jsx)
    * [index.jsx](./components/shared/imageGallery/index.jsx)
  * [AudioPlayer.jsx](./components/shared/AudioPlayer.jsx)
  * [AudioRecorder.jsx](./components/shared/AudioRecorder.jsx)
  * [VideoPlayer.jsx](./components/shared/VideoPlayer.jsx)
  * [WarningModal.jsx](./components/shared/WarningModal.jsx)
  * [Waveform.jsx](./components/shared/Waveform.jsx)
* [social/](./components/social)
  * [Dashboard.jsx](./components/social/Dashboard.jsx)
* [Layout.jsx](./components/Layout.jsx)
* [Navbar.jsx](./components/Navbar.jsx)



## contexts

- [UserContext.js](contexts/UserContext.js)


## data

* [did/](./data/did)
  * [results.json](./data/did/results.json)
* [redux/](./data/redux)
  * [store.js](./data/redux/store.js)
* [replicate/](./data/replicate)
  * [img2img.js](./data/replicate/img2img.js)
  * [txt2img.js](./data/replicate/txt2img.js)
* [legal.js](./data/legal.js)


## pages

* [api/](./pages/api)
  * [auth/](./pages/api/auth)
    * [signout/](./pages/api/auth/signout)
    * [callback.js](./pages/api/auth/callback.js)
  * [did/](./pages/api/did)
    * [close-stream.js](./pages/api/did/close-stream.js)
    * [create-talk-stream.js](./pages/api/did/create-talk-stream.js)
    * [generate-answer.js](./pages/api/did/generate-answer.js)
    * [send-ice-candidate.js](./pages/api/did/send-ice-candidate.js)
    * [start-stream.js](./pages/api/did/start-stream.js)
  * [replicate/](./pages/api/replicate)
    * [[id].js](./pages/api/replicate/[id].js)
    * [index.js](./pages/api/replicate/index.js)
  * [xilabs/](./pages/api/xilabs)
    * [create_new_voice.js](./pages/api/xilabs/create_new_voice.js)
    * [delete_voice.js](./pages/api/xilabs/delete_voice.js)
    * [delete_voiceover.js](./pages/api/xilabs/delete_voiceover.js)
    * [download_voiceover.js](./pages/api/xilabs/download_voiceover.js)
    * [edit_voice.js](./pages/api/xilabs/edit_voice.js)
    * [get_history.js](./pages/api/xilabs/get_history.js)
    * [get_voices.js](./pages/api/xilabs/get_voices.js)
    * [tts.js](./pages/api/xilabs/tts.js)
* [broadcast/](./pages/broadcast)
  * [index.jsx](./pages/broadcast/index.jsx)
* [_app.js](./pages/_app.js)
* [_document.js](./pages/_document.js)
* [index.js](./pages/index.js)

## public

- [IMG_1870.png](public/IMG_1870.png)
- [IMG_1872.png](public/IMG_1872.png)
- [alien.png](public/alien.png)
- [brandMark.png](public/brandMark.png)
- [contest_vertical.png](public/contest_vertical.png)
- [cover.png](public/cover.png)
- [logoSquare.png](public/logoSquare.png)
- [neuro1.png](public/neuro1.png)
- [steam.png](public/steam.png)


## streamServer

- [app.py](streamServer/app.py)


## styles

- [globals.css](styles/globals.css)
- [theme.js](styles/theme.js)


## utils

* [auth/](./utils/auth)
  * [oauth2token.js](./utils/auth/oauth2token.js)
* [production/](./utils/production)
  * [upload.js](./utils/production/upload.js)
* [redux/](./utils/redux)
  * [gallerySlice.js](./utils/redux/gallerySlice.js)
* [replicate/](./utils/replicate)
  * [fetchGalleryImages.js](./utils/replicate/fetchGalleryImages.js)
  * [toBlob.js](./utils/replicate/toBlob.js)
  * [uploadPrediction.js](./utils/replicate/uploadPrediction.js)
* [convertDataToURI.js](./utils/convertDataToURI.js)
* [convertDate.js](./utils/convertDate.js)
* [downloadFile.js](./utils/downloadFile.js)
* [downloadS3Mp4.js](./utils/downloadS3Mp4.js)
* [downloadUrl.js](./utils/downloadUrl.js)
* [sliceWords.js](./utils/sliceWords.js)

