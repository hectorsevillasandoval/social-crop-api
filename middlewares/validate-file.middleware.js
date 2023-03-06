const { allowedFileTypes, socialCropSizes } = require('../helpers/constants')

const validateFile = (req, res, next) => {
  console.log(JSON.stringify(req.files))
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.photo) {
    res.status(400).json({ msg: 'No files were uploaded.' })
    return
  }

  next()
}

const validateType = (req, res, next) => {
  const { photo } = req.files
  const extension = photo.name.slice(photo.name.lastIndexOf('.') + 1).toUpperCase()

  if (!allowedFileTypes.includes(extension)) return res.status(500).json({ msg: `Invalid file extension: ${extension}` })

  next()
}

const selectedSocialMediaNetworks = (req, res, next) => {
  const { selected_networks: socialNetworks } = req.body
  let cropToThisNetworks = []
  if (!socialNetworks || !socialNetworks.length) return res.status(500).json({ status: 'error', msg: 'Please select a social network' })

  cropToThisNetworks = [socialNetworks].flat()

  const socialMediaPicks = []

  for (const network of cropToThisNetworks) {
    if (!socialCropSizes[network]) continue
    socialMediaPicks.push({
      socialNetwork: network, photoSizes: socialCropSizes[network]
    })
  }

  req.socialMediaPicks = socialMediaPicks
  next()
}

module.exports = {
  validateFile,
  validateType,
  selectedSocialMediaNetworks
}
