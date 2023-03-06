const socialCropSizes =
  {
    // Facebook
    facebook: {
      cover_photo: {
        height: 312,
        width: 830
      },
      profile_photo: {
        height: 170,
        width: 170
      },
      post_image: {
        height: 1080,
        width: 1080
      },
      event_cover_photo: {
        height: 628,
        width: 1200
      }
    },
    // Instagram
    instagram: {
      profile_photo: {
        height: 110,
        width: 110
      },
      post_image: {
        height: 1080,
        width: 1080
      },
      story_photo: {
        height: 1080,
        width: 1920
      }
    },
    // Pinterest
    pinterest: {
      profile_photo: {
        height: 165,
        width: 165
      },
      cover_photo: {
        height: 450,
        width: 800
      },
      pins: {
        height: 660,
        width: 236
      }
    },
    // Twitter
    twitter: {
      profile_photo: {
        height: 400,
        width: 400
      },
      header_photo: {
        height: 500,
        width: 1500
      },
      card_photo: {
        height: 628,
        width: 1200
      },
      post_photo: {
        height: 675,
        width: 1200
      }
    },
    // Youtube
    youtube: {
      profile_photo: {
        height: 800,
        width: 800
      },
      cover_photo: {
        height: 1440,
        width: 2560
      },
      thumbnail_image: {
        height: 720,
        width: 1280
      }
    },
    // Linkedin
    linkedin: {
      company_profile_photo: {
        height: 300,
        width: 300
      },
      company_banner_photo: {
        height: 191,
        width: 1128
      },
      post_photo: {
        height: 1200,
        width: 1200
      },
      profile_photo: {
        height: 400,
        width: 400
      }
    },
    // Snapchat
    snapchat: {
      ads: {
        height: 1920,
        width: 1080
      },
      geofilter: {
        height: 120,
        width: 120
      }
    },
    // Tiktok
    tiktok: {
      profile_photo: {
        height: 20,
        width: 20
      },
      video: {
        height: 1920,
        width: 1080
      }
    }
  }

const allowedFileTypes = ['JPEG', 'PNG', 'JPG', 'WEBP']

module.exports = {
  allowedFileTypes,
  socialCropSizes
}
