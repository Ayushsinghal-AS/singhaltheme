<template>
  <div
    class="main-footer"
    :style="
      `--footer_nav_hover_color:${global_config.props.footer_nav_hover_color};border-top: 1px solid ${global_config.props.footer_border_color};background-color: ${global_config.props.footer_bg_color};color: ${global_config.props.footer_text_color};
      margin-top: ${global_config.props.margin_footer}px;`
    "
  >
    <div class="main-footer__bottom">
      <div class="about-block" v-if="true">
        <div class="logo-Icon">
          <div class="imgFooter">
            <img :src="global_config.props.logo" />
          </div>
          <div>
            <ul class="row2">
              <li
                v-for="(item, index) in context &&
                  context.app_info &&
                  context.app_info.social_links"
                :key="index"
              >
                <span v-if="item.link">
                  <fdk-link :link="item.link" target="_blank" :title="item.title">
                    <img alt="social.title" :src="item.icon" />
                  </fdk-link>
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <p class="desc">
            {{ global_config.props.footer_description }}
          </p>
        </div>
        <div>
          <ul class="row">
            <li
              v-for="(item, index) in context &&
                context.app_info &&
                context.app_info.social_links"
              :key="index"
            >
              <span v-if="item.link">
                <fdk-link :link="item.link" target="_blank" :title="item.title">
                  <img alt="social.title" :src="item.icon" />
                </fdk-link>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div class="flexBox">
        <div class="item-block">
        <div
          class="link-block"
          v-for="(item, index) in context.navigation"
          :key="index"
        >
          <h5 class="footer-head">
            <fdk-link :link="item.link">
              {{ item.display }}
            </fdk-link>
          </h5>
          <ul
            class="list"
            v-for="(subItem, index) in item.sub_navigation"
            :key="index"
          >
            <li>
              <fdk-link :link="subItem.link">
                {{ subItem.display }}
              </fdk-link>
            </li>
          </ul>
        </div>
        </div>
        <div class="social-link-block">
        <h5 class="footer-head">Contact info</h5>
        <div class="flat">
          <ul
            class="list"
            v-if="
              context.support.contact.phone.active &&
                context.support.contact.phone.phone.length > 0
            "
          >
            <li>{{ address }}</li>
          </ul>
          <ul
            class="list"
            v-if="
              context.support.contact.phone.active &&
                context.support.contact.phone.phone.length > 0
            "
          >
            <li>{{ context.support.contact.phone.phone[0].number }}</li>
          </ul>
          <ul
            class="list"
            v-if="
              context.support.contact.email.active &&
                context.support.contact.email.email.length > 0
            "
          >
            <li>{{ context.support.contact.email.email[0].value }}</li>
          </ul>
        </div>
        </div>
      </div>
      <div class="flexBoxMob">
        <div class="item-block">
          <div
            class="link-block"
            v-for="(item, index) in context.navigation"
            :key="index"
          >
            <app-accordion class="mb-4" gap_between="165">
              <template v-slot:title>
                <div>
                  <h5 class="footer-head">
                    <fdk-link :link="item.link">
                      {{ item.display }}
                    </fdk-link>
                  </h5>
                </div>
              </template>
              <template v-slot:content>
                <ul
                  class="list"
                  v-for="(subItem, index) in item.sub_navigation"
                  :key="index"
                >
                <li>
                  <fdk-link :link="subItem.link">
                    {{ subItem.display }}
                  </fdk-link>
                </li>
              </ul>
              </template>
            </app-accordion>
          </div>
        </div>

        <div class="social-link-block">
          <app-accordion class="mb-4" gap_between="165">
              <template v-slot:title>
                <div>
                  <h5 class="footer-head">Contact info</h5>
                </div>
              </template>
              <template v-slot:content>
                <div class="flat">
                  <ul
                    class="list"
                    v-if="
                      context.support.contact.phone.active &&
                        context.support.contact.phone.phone.length > 0
                    "
                  >
                    <li>{{ address }}</li>
                  </ul>
                  <ul
                    class="list"
                    v-if="
                      context.support.contact.phone.active &&
                        context.support.contact.phone.phone.length > 0
                    "
                  >
                    <li>{{ context.support.contact.phone.phone[0].number }}</li>
                  </ul>
                  <ul
                    class="list"
                    v-if="
                      context.support.contact.email.active &&
                        context.support.contact.email.email.length > 0
                    "
                  >
                    <li>{{ context.support.contact.email.email[0].value }}</li>
                  </ul>
                </div>
              </template>
          </app-accordion>
        </div>
      </div>
    </div>
    <hr  class="hrtag"/>
    <div class="sub-footer_bottom">
      <div class="copyrightData">{{ context.app_info.copyright_text }}</div>
      <div class="paymentLogo">
        <img :src="global_config.props.logo_payment" />
      </div>
    </div>
  </div>
</template>

<script>
import { logoUrl } from "../../helper/utils";
import accordion from '../../components/common/accordion.vue';
export default {
  components: {
    'app-accordion': accordion,
  },
  props: {
    context: {},
    global_config: {},
  },
  data() {
    return {
      isMounted: false,
      address: "",
    };
  },
  mounted() {
    this.isMounted = true;
    this.address = this.context.app_info.address.address_line[0] + ', '+ this.context.app_info.address.address_line[1] + 
    this.context.app_info.address.city + this.context.app_info.address.pincode;
  },
  computed: {
    getLogoUrl() {
      return logoUrl(this.context.logo, this.context.mobileLogo);
    },
  },
};
</script>

<style lang="less" scoped>
.main-footer {
  margin-top: 3.125rem;
  font-size: 0.8125rem;
  letter-spacing: 0.65px;
  font-size: 12px;
  overflow-x:hidden;
  @media @mobile {
    text-align: center;
  }
  .sub-footer_bottom {
    padding-top: 17px;
    padding-bottom: 28px;
    padding-left: 94px;
    display: flex;
    flex-direction: row;
    color: @FooterText;
    background-color: @FooterBottomBackground;

    @media screen and (max-width: 768px) {
      width: max-content;
      padding-left: 32px;
    }

    @media @mobile {
      flex-direction: column;
      padding-left: 12.5px; 
      padding-right: 12.5px;
    }
    justify-content: space-between;
    .copyrightData {
      color: @FooterText;
      padding-top: 11px;
      @media screen and (max-width: 480px) {
        width: 295px;
        padding-left: 25px;
      }
    }
    .paymentLogo {
      padding-right: 72px;
    }
  }

  .footer-links {
    display: flex;
    align-items: center;
    justify-content: center;
    @media @mobile {
      flex-wrap: wrap;
    }
    .link-item {
      margin-right: 0.9375rem;
      @media @mobile {
        margin-bottom: 0.625rem;
      }
      // color: @color-gray;
      position: relative;
      &:after {
        bottom: 0;
        content: "";
        display: block;
        height: 1px;
        left: 50%;
        position: absolute;
        background: var(--footer_nav_hover_color);
        transition: width 0.3s ease 0s, left 0.3s ease 0s;
        width: 0;
      }
      &:hover {
        &:after {
          width: 100%;
          left: 0;
        }
        color: var(--footer_nav_hover_color);
      }
    }
  }
  .hrtag {
    margin: 0px;
  }
  .imgFooter {
    padding-left: 71px;
    @media screen and (max-width: 768px) {
      padding-left: 0px;

    }
  }

  .logo-Icon{
    @media screen and (max-width: 768px) {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
  }

  .flexBox {
    display: flex;
    column-gap: 81px;
    padding-left: 253px;
    flex: auto;
    @media screen and (max-width: 768px) {
      column-gap: 102px;
      padding-left: 0px;
    }
    @media screen and (max-width: 480px) {
      display: none;
      flex-direction: column;
      text-align-last: left;
    }
  }

  .flexBoxMob {
    display: none;  
    @media screen and (max-width: 480px) {
      display: block;
      flex-direction: column;
      text-align-last: left;
    }
  }

  &__bottom {
    padding: 25px 25px;
    display: flex;
    background-color: @FooterBackground;
    color: @FooterText;
    flex-direction: row;
    @media screen and (max-width: 768px) {
      flex-direction: column;
      padding: 26.13px 32px;
    }
    justify-content: space-between;
    .about-block {
      .row {
        padding-left: 71px;
        padding-bottom: 45px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        @media screen and (max-width: 768px) {
          display: none;
        }
        @media @mobile {
          justify-content: center;
        }
        li {
          margin: auto 2px;
          img {
            width: 30px;
            color: var(--footer_bg_color);
          }
        }
      }
      .row2 {
        padding-left: 71px;
        padding-bottom: 45px;
        display: none;
        flex-direction: row;
        justify-content: flex-start;
        @media screen and (max-width: 768px) {
          display: flex;
          padding-bottom: 0;
        }
        @media @mobile {
          justify-content: center;
        }
        li {
          margin: auto 2px;
          img {
            width: 30px;
            color: var(--footer_bg_color);
          }
        }
      }
      .footer-head {
        color: @FooterText;
        font-size: 16px;
        margin-bottom: 16px;
        @media @mobile {
          font-size: 16px;
        }
      }
      .desc {
        padding-left: 71px;
        color: @FooterText;
        width: 373px;
        font-size: 12px;
        line-height: 20px;
        font-weight: 400; 
        @media screen and (max-width: 768px) {
          max-width: max-content;
          width: 100%;
          padding-left: 0px;
        }
        @media @mobile {
          max-width: max-content;
          text-align: start;
          width: 288px;
          line-height: 18px;
        }
      }

      .email {
        width: 250px;
        margin-top: 20px;
        margin-bottom: 20px;
        height: 30px;
        border: 1px solid white;
      }
      input[type="text"],
      textarea {
        background-color: var(--footer_bg_color);
        border-color: white;
      }
      .btn {
        width: 140px;
        height: 30px;
        color: white;
        background-color: black;
        margin-top: 30px;
        margin-bottom: 30px;
        letter-spacing: 4px;
      }
      ::placeholder {
        color: white;
      }
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 35px;
      padding-top: 32px;
      @media screen and (max-width: 768px) {
        width: 100%;
        align-items: baseline;
        padding-top: 0px;
        gap: 34px;
      }
      @media @mobile {
        width: auto;
      }
    }
    .link-block {
      @media screen and (max-width: 768px) {
        width: unset;
      }
      @media @mobile {
        // margin: 8px;
        width: auto;
      }
      .footer-head {
        color: @FooterText;
        font-size: 16px;
        font-weight: 500;
        margin-bottom: 16px;
        @media @mobile {
          font-size: 16px;
          width: 115px;
        }
      }
      li {
        margin-bottom: 10px;
        line-height: 20px;
        font-size: 14px;
        font-weight: 400;
        @media @mobile {         
          font-size: 12px;
        }
      }
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }
    .social-link-block {
      @media screen and (max-width: 768px) {
        padding-top: 0px;
        width: unset;
      }
      @media @mobile {
        // margin: 8px;
        width: auto;
      }
      .flat {
        color: @FooterText;
        @media screen and (max-width: 768px) {
          display: flex;
          flex-direction: column;
          width: 100%;
        }
        @media @mobile {
          flex-direction: column;
          width: auto;
          justify-content: space-evenly;
        }
      }
      .footer-head {
        color: @FooterText;
        font-size: 16px;
        font-weight: 500;
        margin-bottom: 16px;
        @media @mobile {
          font-size: 16px;
          width: 115px;
        }
      }
      li {
        margin-bottom: 10px;
        width: 246px;
        letter-spacing: 1px;
        font-size: 14px;
        line-height: 20px;
        font-weight: 400;
        @media @tablet {
          font-size: 12px;
        }
        @media @mobile {
          width: 288px;
          text-align: -webkit-left;
          letter-spacing: 1px;
          font-size: 12px;
        }
      }
      .row {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        @media screen and (max-width: 768px) {
          justify-content: center;
        }
        @media @mobile {
          justify-content: center;
        }
        li {
          margin: auto 2px;
          img {
            width: 30px;
            color: var(--footer_bg_color);
          }
        }
      }
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      padding-top: 95px;
    }
    .item-block {
      display: flex;
      padding-top: 95px;
      column-gap: 81px;
      @media screen and (max-width: 768px) {
        padding-top: 0px;
        column-gap: 102px;
        width: 100%;;
      }
      @media @mobile {
        flex-direction: column;
      }
    }
    @media @tablet {
      // padding: 1.25rem 3.125rem 1.875rem 3.125rem;
    }
    @media @mobile {
      flex-direction: column;
    }
    // .logo-block {
    // }
    .social-block {
      margin-left: auto;
      display: flex;
      align-items: center;
      flex: 0 0 17%;
      justify-content: flex-end;
      @media @mobile {
        flex: 0 0 100%;
        margin-top: 30px;
        justify-content: center;
        margin-left: unset;
      }
      .icons-box {
        display: flex;
        flex-wrap: wrap;
        li {
          margin-right: 5px;
          &:last-child {
            margin-right: 0;
          }
        }
      }
    }

    .app-logo {
      max-width: 80px;
      margin-bottom: 0.3125rem;
    }
  }
}
</style>
