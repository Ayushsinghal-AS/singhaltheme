import { isBrowser } from "browser-or-node";

import Blog from "./templates/pages/blog.vue";
import Home from "./templates/pages/home.vue";
import Footer from "./templates/components/footer.vue";
import Header from "./templates/components/header.vue";
import Loader from "./templates/components/loader.vue";
import styles from "./global/head.less";
import CustomTemplates from "./custom-templates";
import sections from "./sections";
import Login from './templates/pages/login.vue'
import Register from './templates/pages/register.vue'

export default {
  // Main chunk
  getFooter: () => Footer,
  getHeader: () => Header,
  getHome: () => Home,
  getBlog: () => Blog,
  getEmptyState: () => null,
  getLoader: () => Loader,


  getScreenSaver: () =>
    import(
      /*webpackChunkName:"extras" */ "./templates/components/screen-saver.vue"
    ),
  getProductReviews: () =>
    import(
      /*webpackChunkName:"extras" */ "./templates/pages/product-reviews.vue"
    ),
  getAddProductReview: () =>
    import(
      /*webpackChunkName:"extras" */ "./templates/pages/add-product-review.vue"
    ),
  getFaq: () =>
    import(/*webpackChunkName:"extras" */ "./templates/pages/faq.vue"),

  getCartLanding: () =>
    import(/* webpackChunkName:"cart" */ "./templates/pages/cart-landing.vue"),
  getCartReview: () =>
    import(/* webpackChunkName:"cart" */ "./templates/pages/cart-review.vue"),
  getCartDelivery: () =>
    import(/* webpackChunkName:"cart" */ "./templates/pages/cart-delivery.vue"),

  getBrands: () => import(/* webpackChunkName:"products" */ "./templates/pages/brands.vue"),

  getCategories: () =>
    import(
      /* webpackChunkName:"products" */ "./templates/pages/categories.vue"
    ),
  getCollections: () =>
    import(
      /* webpackChunkName:"products" */ "./templates/pages/collections.vue"
    ),
  getProductDescription: () =>
    import(
      /* webpackChunkName:"products" */ "./templates/pages/product-description.vue"
    ),
  getCompareProducts: () =>
    import(
      /* webpackChunkName:"products" */ "./templates/pages/compare-products.vue"
    ),

  getProductListing: () =>
    import(
      /* webpackChunkName:"products-listing" */ "./templates/pages/product-listing.vue"
    ),
  getCollectionListing: () =>
    import(
      /* webpackChunkName:"products-listing" */ "./templates/pages/collection-listing.vue"
    ),
  getBrandListing: () =>
    import(
      /* webpackChunkName:"products-listing" */ "./templates/pages/brand-listing.vue"
    ),
  getCategoryListing: () =>
    import(
      /* webpackChunkName:"products-listing" */ "./templates/pages/category-listing.vue"
    ),

  getOrderTrackingDetails: () =>
    import(
      /* webpackChunkName:"profile" */ "./templates/pages/order-tracking-details.vue"
    ),
  getOrderTracking: () =>
    import(
      /* webpackChunkName:"profile" */ "./templates/pages/order-tracking.vue"
    ),
  getOrderStatus: () =>
    import(
      /* webpackChunkName:"profile" */ "./templates/pages/order-status.vue"
    ),
  getOrdersList: () =>
    import(
      /* webpackChunkName:"profile" */ "./templates/pages/orders-list.vue"
    ),
  getWishList: () =>
    import(
      /* webpackChunkName:"profile" */ "./templates/pages/wishlist.vue"
    ),
  getProfileDetails: () =>
    import(
      /* webpackChunkName:"profile" */ "./templates/pages/profile-details.vue"
    ),
  getShipmentDetails: () =>
    import(
      /* webpackChunkName:"profile" */ "./templates/pages/shipment-details.vue"
    ),
  getProfileAddress: () =>
    import(
      /* webpackChunkName:"profile" */ "./templates/pages/profile-address.vue"
    ),
  getCustomTemplates: () => {
    return CustomTemplates;
  },
  getLogin: () => import(/*webpackChunkName:"auth" */ "./templates/pages/login.vue"),

  getRegister: () => import(/*webpackChunkName:"auth" */ "./templates/pages/register.vue"),
  bootstrapTheme: (vueApp) => {
    if (!isBrowser) {
      return Promise.resolve();
    }

    /** Need to optimize the way to get the current global_config data */
    const themeConfig = vueApp?.store?.state?.appmeta?.theme?.config || {};
    const currentConfig = themeConfig.current || "";
    const configList = themeConfig.list || [];
    const currentGlobalConfig = configList.find((configData) => configData.name === currentConfig) || {};
    const globalConfigData = currentGlobalConfig?.global_config?.custom?.props || {};

    const headerFont = globalConfigData.font_header;
    const bodyFont = globalConfigData.font_body;

    const headerFontName = headerFont.family || "";
    const headerFontVariants = headerFont.variants || {};

    const bodyFontName = bodyFont.family || "";
    const bodyFontVariants = bodyFont.variants || {};

    let styles = "";

    if (headerFontName) {
      Object.keys(headerFontVariants).forEach((variant) => {
        let fontStyles = `
            @font-face {
              font-family: ${headerFontName};
              src: local(${headerFontName}),
                url(${headerFontVariants[variant].file});
              font-weight: ${headerFontVariants[variant].name};
              font-display: swap;
            }
          `;

        styles = styles.concat(fontStyles);
      });

      const customFontClasses = `
          .font-header {
            font-family: ${headerFontName} !important;
          }
        `;

      styles = styles.concat(customFontClasses);
    }

    if (bodyFontName) {
      Object.keys(bodyFontVariants).forEach((variant) => {
        let fontStyles = `
            @font-face {
              font-family: ${bodyFontName};
              src: local(${bodyFontName}),
                url(${bodyFontVariants[variant].file});
              font-weight: ${bodyFontVariants[variant].name};
              font-display: swap;
            }
          `;

        styles = styles.concat(fontStyles);
      });

      const customFontClasses = `
          .font-body {
            font-family: ${bodyFontName} !important;
          }
        `;

      styles = styles.concat(customFontClasses);
    }

    if (styles && typeof document !== "undefined") {
      var styleSheet = document.createElement("style");
      styleSheet.innerText = styles;
      document.head.appendChild(styleSheet);
    }
  },
  sections
};
