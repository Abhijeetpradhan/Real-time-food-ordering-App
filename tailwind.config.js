module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme:
  {
    screens: {
      'small': '300px',
      'mobile': '481px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',

    },
    extend: {
      fontFamily: {
        body: ['"PT Sans Narrow"'],
        body1: ["Pacifico"],
      },
      fontSize: {
        homesize: ['150px'],
      },
      letterSpacing: {
        newspacing: ['9px'],
        lgnewspacing: ['7px'],

      },
      width: {
        mywidth: ['710px'],
        mdwidth: ['600px'],
        
      },
      maxWidth: {
        smimgwidth: ['160px'],
        smimgwidthsl3: ['190px'],
        extrasmall: ['120px'],
        mid: ['350px'],
        medium: ['520px'],
      },
      height: {
        imght: '350px',
        aboutimght: '580px',
      },

      colors: {
        primary: '#fd9d3e',
        tab: '#2b2c2d',
        para: '#999999',
        background: '#121619',
        chefbg: '#f4f2ed',
        chefhoverbg: '#20202f',
      },
      margin:{
        mdsl2:['104px'],
      },
    },
  },
  variants: {
    extend: {
      invert: ["hover"],
      backgroundColor: ['active'],
      display: ["group-hover"],
      inset:["group-hover"],
    },

  },
  plugins: [],
}


