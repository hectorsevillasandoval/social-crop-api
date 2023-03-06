const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)
const { uploadFile } = require('../helpers/upload-file')
const { socialCropSizes } = require('../helpers/constants')

const uploadImageToCloudinary = async (req, res) => {
  try {
    const { tempFilePath } = req.files.photo
    const { socialMediaPicks } = req
    const { public_id: publicId, format, ...info } = await cloudinary.uploader.upload(tempFilePath, {
      quality_analysis: true,
      public_id_prefix: 'social-crop',
      auto_tagging: 0.6,
      detection: 'coco_v1'
    })
    console.log(JSON.stringify(info))
    let socialMediaNetworks = []

    if (!socialMediaPicks) {
      for (const [key, value] of Object.entries(socialCropSizes)) {
        socialMediaNetworks.push({
          socialNetwork: key, photoSizes: value
        })
      }
    } else {
      socialMediaNetworks = socialMediaPicks
    }

    const socialCropUrls = socialMediaNetworks.map(elem => {
      const URLs = []
      for (const [sizeName, sizeValues] of Object.entries(elem.photoSizes)) {
        URLs.push({
          name: sizeName,
          width: sizeValues.width,
          height: sizeValues.height,
          URL: cloudinaryResizeImage(publicId, format, sizeValues)
        })
      }
      return {
        name: elem.socialNetwork,
        URLs
      }
    })

    return res.json({
      status: 'success',
      croppedUrls: socialCropUrls
    })
  } catch (error) {
    res.status(400).json({
      msg: 'Something went wrong uploading',
      error
    })
  }
}

const cloudinaryResizeImage = (publicId, format, { width = 0, height = 0 }) => {
  if (!(width && height)) throw new Error('Width and height are required')

  const resizeOptions = {
    height,
    width,
    crop: 'fill',
    gravity: 'auto'
  }

  return cloudinary.url(`${publicId}.${format}`, resizeOptions)
}

const uploadFileFn = async (req, res) => {
  try {
    console.log("req.files >>>", req.files); // eslint-disable-line

    const resultLog = await uploadFile(req.files.file, undefined, 'users')

    return res.json({
      msg: resultLog
    })
  } catch (error) {
    return res.status(400).json({ msg: error })
  }
}

module.exports = {
  uploadFileFn,
  uploadImageToCloudinary
}
