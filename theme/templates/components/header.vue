<template>
<div :class="{'header-wrap': true, 'header-wrap-menu-below': global_config.props.menu_position == 'bottom'}" :style="`--header_nav_hover_color:${global_config.props.header_nav_hover_color};--header_icon_color:${global_config.props.header_icon_color};`">
  <div class="header">
    <div class="desktop desktop-nav" :style="`border-bottom: 1px solid ${global_config.props.header_border_color}`">
      <div class="left bottom-menu">
        <div class="left__navigation">
          <ul class="l1-navigation-list">
            <li
              class="l1-navigation-list__item mr-5"
              v-for="(nav, index) in context.navigation"
              :key="index"
            >
              <fdk-link :link="nav.link" >
                <span class="u-df-align-center">
                  <div class="nav-img">
                    <div v-if="nav.image"><img :src="nav.image" style="width:16px" /></div>
                    <div><p class="mr-2">{{ nav.display }}</p></div>
                  </div>
                  <span class="dropdown-icon"  >
                    <svg  v-if="nav.sub_navigation && nav.sub_navigation.length>0" class="u-df-align-center" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="14px" height="14px" :style="`fill:${global_config.props.header_icon_color}`"
                      viewBox="0 0 512 512"  xml:space="preserve">
                    <path  d="M256,294.1L383,167c9.4-9.4,24.6-9.4,33.9,0s9.3,24.6,0,34L273,345c-9.1,9.1-23.7,9.3-33.1,0.7L95,201.1
                      c-4.7-4.7-7-10.9-7-17c0-6.1,2.3-12.3,7-17c9.4-9.4,24.6-9.4,33.9,0L256,294.1z"/>
                    </svg>
                  </span>
                </span>
              </fdk-link>

              <div class="submenu">
                <ul class="l2-navigation-list" v-if="nav.sub_navigation && nav.sub_navigation.length>0 && !isShow" >
                <li
                  class="l2-navigation-list__item"
                  v-for="(subnav, index2) in nav.sub_navigation"
                  :key="index2"
                >
                  <fdk-link :link="subnav.link"><p>{{ subnav.display }}</p></fdk-link>

                  <ul class="l3-navigation-list">
                    <li
                      class="l3-navigation-list__item" 
                      v-for="(subnavBar, index3) in subnav.sub_navigation" 
                      :key="index3"
                    >
                      <fdk-link :link="subnavBar.link"><p>{{ subnavBar.display }}</p></fdk-link>
                    </li>
                  </ul>
                </li>
                </ul>
                <ul class="l2-navigation-list2" v-if="nav.sub_navigation && nav.sub_navigation.length>0 && isShow">
                <li
                  class="l2-navigation-list__item"
                  v-for="(subnav, index2) in nav.sub_navigation"
                  :key="index2"
                >
                  <fdk-link :link="subnav.link"><p>{{ subnav.display }}</p></fdk-link>

                  <ul class="l3-navigation-list">
                    <li
                      class="l3-navigation-list__item" 
                      v-for="(subnavBar, index3) in subnav.sub_navigation" 
                      :key="index3"
                    >
                      <fdk-link :link="subnavBar.link"><p>{{ subnavBar.display }}</p></fdk-link>
                    </li>
                  </ul>
                </li>
                </ul>
                <div class="imgHover" v-if="nav.sub_navigation && nav.sub_navigation.length>0 && isShow && context.navigation[index].sub_navigation[index].sub_navigation.length > 4">
                  <div class="img1">
                    <img :src="getImg[1].img" />
                    <div class="img-p">
                      <p>{{ getImg[1].display }}</p>
                    </div>
                  </div>
                  <div class="img2">
                    <img :src="getImg[0].img" />
                    <div class="img-p2">
                      <p>{{ getImg[0].display }}</p>
                    </div>
                  </div>
                </div>
                <div class="overlay show">&nbsp;</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="right-nav">
        <div class="center-cont">
          <fdk-link link="/" class="center-cont__logo">
            <img :src="context.logo.secure_url" alt />
          </fdk-link>
        </div>
        <div class="right u-df-align-center">
          <fdk-accounts class="right__icons" >
            <template slot-scope="accountsData">
              <div
                class="icon right__icons--profile mr-5 py-5"
                v-if="isMounted"
                @click="checkLogin(accountsData, 'profile')"
              >
                <div v-if="!context.is_logged_in">Sign In</div>
                <div v-else>
                  <svg class="header-icons" width="1.35rem" height="1.49rem" title="Search"
                    version="1.1" id="Layer_1" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.8002 20.6H1.2002V19.8C1.2002 14.9399 5.14009 11 10.0002 11C14.8603 11 18.8002 14.9399 18.8002 19.8V20.6Z" stroke="#261A1A" stroke-width="1.5"/>
                    <path d="M5.2002 6.19844C5.2002 8.84941 7.34923 10.9984 10.0002 10.9984C12.6512 10.9984 14.8002 8.84941 14.8002 6.19844C14.8002 3.54747 12.6512 1.39844 10.0002 1.39844C7.34923 1.39844 5.2002 3.54747 5.2002 6.19844Z" stroke="#261A1A" stroke-width="1.5"/>
                  </svg>
                </div>
              </div>
              <div
                class="icon right__icons--search mr-5 py-5"
                @click="callSearch"
              >
                <svg v-if="!showSearch" class="header-icons" width="1.2rem" height="1.49rem" title="Search"
                  version="1.1" id="Layer_1" viewBox="0 0 21 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="9.7615" cy="9.7615" r="8.7615" stroke="#261A1A" stroke-width="1.5"/>
                  <path d="M15.394 16.6484L19.7748 21.655" stroke="#261A1A" stroke-width="1.5"/>
                </svg>

                <svg width="1.875rem" height="1.875rem" class="header-icons" title="Close Search" v-else
                version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve" :style="`fill:${global_config.props.header_icon_color}`">
                  <g id="Icon_5_">
                    <g>
                      <polygon  points="405,136.798 375.202,107 256,226.202 136.798,107 107,136.798 226.202,256 107,375.202 136.798,405 256,285.798
                        375.202,405 405,375.202 285.798,256 		"/>
                    </g>
                  </g>
                </svg>
              </div>
              <div
                class="icon right__icons--wishlist mr-5 py-5"
                v-if="isMounted"
                @click="checkLogin(accountsData, 'wishlist')"
              >
                <svg class="header-icons" width="1.35rem" height="1.49rem" title="Wishlist"
                  version="1.1" id="Layer_1" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.9983 20.3335C11.9983 20.3335 20.6177 12.581 22.0066 9.9189C22.8746 8.25514 22.8246 6.63122 22.3948 5.28806C21.6945 3.16093 19.564 1.71094 17.3481 1.71094C16.0649 1.71094 14.8844 2.17803 13.9624 2.93104C13.2591 3.54326 12.5946 4.21164 11.9963 4.92758C11.398 4.21164 10.7337 3.54327 10.0303 2.93105C9.1083 2.17804 7.92784 1.71094 6.64458 1.71094C4.42865 1.71094 2.29822 3.16093 1.59788 5.28806C1.16807 6.63123 1.11805 8.25514 1.9861 9.91891C3.375 12.581 11.9983 20.3335 11.9983 20.3335Z" stroke="#261A1A" stroke-width="1.5"/>
                </svg>
              </div>
              <div
                class="icon right__icons--bag mr-5 py-5"
                v-if="isMounted && !global_config.props.disable_cart"
                @click="checkLogin(accountsData, 'cart')"
              >
                <svg width="1.35rem" height="1.49rem" class="header-icons" title="Cart"
                  version="1.1" id="Layer_1" viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 8H1V23H17V8H13M5 8V5C5 2.79086 6.79086 1 9 1V1C11.2091 1 13 2.79086 13 5V8M5 8H13" stroke="#261A1A" stroke-width="1.5"/>
                </svg>

                <p class="cart-count u-df-align-center" :style="`background-color: ${global_config.props.header_cart_notification_bg_color};color: ${global_config.props.header_cart_notification_text_color};`">
                  {{ context.cart_item_count }}
                </p>
              </div>

              <transition name="slide-fade">
                <fdk-search class="search" v-if="showSearch" :has_products="true">
                  <template slot-scope="searchData">
                    <div class="inputarea">
                      <input
                      class="search__input"
                      placeholder="Enter your search"
                      type="text"
                      id="searchInput"
                      autocomplete="off"
                      @keyup.enter="
                        showSearch = false;
                        selectedIndex === null
                          ? getEnterSearchData(searchData)
                          : getSearchData();
                      "
                      @keydown="onArrowKey"
                      v-click-outside="hideList"
                      v-on:focus="showSearch = true"
                      @input="
                        fetchSuggestions($event, searchData.fetchSuggestions)
                      "
                      />
                    </div>
                    <div
                      @click="
                        showSearch = false;
                        searchtext = '';
                      "
                    >
                      <svg width="1.875rem" height="1.875rem" class="arrow-icon"
                      version="1.1" id="Layer_1" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.8574 14.8549L1.14307 1.14062M1.14307 14.8549L14.8574 1.14062" stroke="#261A1A" stroke-width="1.5"/>
                      </svg>

                    </div>

                    <div
                      class="suggestions"
                      :style="`background-color: ${global_config.props.header_bg_color};color: ${global_config.props.header_text_color}`"
                      v-if="
                        showSearch &&
                          (searchData.suggestions && searchData.suggestions.length > 0 ||
                          searchData.productSuggestions && searchData.productSuggestions.length > 0 ||
                            searchData.noResults)
                      "
                    >
                      <ul
                        class="suggestions__products"

                        v-if="searchData.productSuggestions && searchData.productSuggestions.length > 0"
                      >
                        <li
                          class="suggestions__products--item"
                          v-for="(data, index) in getProductSearchSuggestions(
                            searchData.productSuggestions
                          )"
                          :key="index"
                          @click.stop.prevent="
                            showSearch=false;
                            redirectToProduct(data.url);
                            searchtext = '';
                          "
                          v-bind:class="{
                            focus: isFocusedItem(data),
                          }"
                        >
                          <div class="searchDataImage" v-if="getShowResultsDesktop">
                            <div class="imgF"><img :src="data.image.url" /></div>
                            <div class="textF">{{ data.name }}</div>
                            <div>{{ data.price.currency_symbol + data.price.max}}</div>
                          </div>
                        </li>
                      </ul>
                      <ul
                        v-if="
                        searchData.productSuggestions &&  searchData.productSuggestions.length === 0 &&
                      searchData.suggestions &&      searchData.suggestions.length === 0 &&
                            searchData.noResults &&
                            showSearch
                        "
                      >
                        <div
                          class="suggestions__products"
                          @click="redirectToProduct('/products/?q=' + searchtext)"
                        >
                          <li class="suggestions__products--item">
                            No match found
                          </li>
                        </div>
                      </ul>
                      <div class="btnSearch" v-if="getShowResultsDesktop">
                        <button @click="redirectToProduct('/products/')">VIEW ALL 24 RESULTS</button>
                      </div>
                    </div>
                    <div class="mainHeading" v-if="!getShowResultsDesktop">
                      <div class="searchHeading">
                        <div class="text"><p>{{ context.navigation[context.navigation.length-1].display }}</p></div>
                        <div v-if="context.navigation[context.navigation.length-1].image"><img :src="context.navigation[context.navigation.length-1].image" style="width:16px" /></div>
                      </div>
                      <ul>
                        <li class="items" v-for="(data, index) in context.navigation[context.navigation.length-1].sub_navigation" :key="index">
                          <p>{{ data.display }}</p>
                        </li>
                        <br />
                      </ul>
                    </div>
                  </template>
                </fdk-search>
              </transition>
            </template>
          </fdk-accounts>
        </div>
      </div>
      <!-- <div class="overlay show">&nbsp;</div> -->
    </div>

    <div class="tab" :style="`border-bottom: 1px solid ${global_config.props.header_border_color}`">
      <div
        class="left"
        @click="
          showHamburgerMenu
        "
      >
        <!-- <IosMenuIcon w="1.875rem" h="1.875rem" /> -->
        <div v-if="!showHamburger">
          <svg width="24px" height="24px"
          
          version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 512 512" :style="`fill:${global_config.props.header_icon_color}`" xml:space="preserve">
            <g>
              <path d="M432,176H80c-8.8,0-16-7.2-16-16l0,0c0-8.8,7.2-16,16-16h352c8.8,0,16,7.2,16,16l0,0C448,168.8,440.8,176,432,176z"/>
              <path d="M432,272H80c-8.8,0-16-7.2-16-16l0,0c0-8.8,7.2-16,16-16h352c8.8,0,16,7.2,16,16l0,0C448,264.8,440.8,272,432,272z"/>
              <path d="M432,368H80c-8.8,0-16-7.2-16-16l0,0c0-8.8,7.2-16,16-16h352c8.8,0,16,7.2,16,16l0,0C448,360.8,440.8,368,432,368z"/>
            </g>
          </svg>
        </div>
        <div v-else class="close-icon" @click.stop="showHamburger = false">
            <!-- <MdCloseIcon w="3.5rem" h="3.5rem" /> -->
            <svg width="24px" height="24px" title="Close menu"
              version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                   viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve" :style="`fill:${global_config.props.header_icon_color}`">
                <g id="Icon_5_" >
                  <g>
                    <polygon points="405,136.798 375.202,107 256,226.202 136.798,107 107,136.798 226.202,256 107,375.202 136.798,405 256,285.798
                      375.202,405 405,375.202 285.798,256 		"/>
                  </g>
                </g>
            </svg>
        </div>
      </div>
      <fdk-link link="/" class="center-mobile">
        <img :src="context.logo.secure_url" alt />
      </fdk-link>
      <fdk-accounts class="right">
        <template slot-scope="accountsData">
          <div
                class="icon right__icons--profile"
                v-if="isMounted"
                @click="checkLogin(accountsData, 'profile')"
              >
                <div v-if="!context.is_logged_in">Sign In</div>
                <div v-else>
                  <svg class="header-icons" width="1.125rem" height="1.125rem" title="Search"
                    version="1.1" id="Layer_1" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.8002 20.6H1.2002V19.8C1.2002 14.9399 5.14009 11 10.0002 11C14.8603 11 18.8002 14.9399 18.8002 19.8V20.6Z" stroke="#261A1A" stroke-width="1.5"/>
                    <path d="M5.2002 6.19844C5.2002 8.84941 7.34923 10.9984 10.0002 10.9984C12.6512 10.9984 14.8002 8.84941 14.8002 6.19844C14.8002 3.54747 12.6512 1.39844 10.0002 1.39844C7.34923 1.39844 5.2002 3.54747 5.2002 6.19844Z" stroke="#261A1A" stroke-width="1.5"/>
                  </svg>
                </div>
          </div>
          <div
                class="icon right__icons--search"
                @click="callSearch2"
              >
                <svg v-if="!showSearch" class="header-icons" width="1.125rem" height="1.125rem" title="Search"
                  version="1.1" id="Layer_1" viewBox="0 0 21 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="9.7615" cy="9.7615" r="8.7615" stroke="#261A1A" stroke-width="1.5"/>
                  <path d="M15.394 16.6484L19.7748 21.655" stroke="#261A1A" stroke-width="1.5"/>
                </svg>

                <svg width="1.875rem" height="1.875rem" class="header-icons" title="Close Search" v-else
                version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve" :style="`fill:${global_config.props.header_icon_color}`">
                  <g id="Icon_5_">
                    <g>
                      <polygon  points="405,136.798 375.202,107 256,226.202 136.798,107 107,136.798 226.202,256 107,375.202 136.798,405 256,285.798
                        375.202,405 405,375.202 285.798,256 		"/>
                    </g>
                  </g>
                </svg>
          </div>
          <div
                class="icon right__icons--bag"
                v-if="isMounted && !global_config.props.disable_cart"
                @click="checkLogin(accountsData, 'cart')"
              >
                <svg width="1.125rem" height="1.125rem" class="header-icons" title="Cart"
                  version="1.1" id="Layer_1" viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 8H1V23H17V8H13M5 8V5C5 2.79086 6.79086 1 9 1V1C11.2091 1 13 2.79086 13 5V8M5 8H13" stroke="#261A1A" stroke-width="1.5"/>
                </svg>

                <p class="cart-count u-df-align-center" :style="`background-color: ${global_config.props.header_cart_notification_bg_color};color: ${global_config.props.header_cart_notification_text_color};`">
                  {{ context.cart_item_count }}
                </p>
          </div>
          <transition name="slide-fade">
            <fdk-search class="search2" v-if="showSearch2" :has_products="true">
              <template slot-scope="searchData">
                <div class="inputarea">
                  <input
                    class="search__input"
                    placeholder="Enter your search"
                    type="text"
                    id="searchInput2"
                    autocomplete="off"
                    @keyup.enter="
                      showSearch2 = false;
                      selectedIndex2 === null
                        ? getEnterSearchData2(searchData)
                        : getSearchData2();
                    "
                    @keydown="onArrowKey2"
                    v-click-outside="hideList2"
                    v-on:focus="showSearch2 = true"
                    @input="fetchSuggestions2($event, searchData.fetchSuggestions)"
                  />
                </div>
                <div
                  @click="
                    showSearch2 = false;
                    searchtext2 = '';
                  "
                >
                  <svg width="1.355rem" height="1.875rem" class="arrow-icon"
                  version="1.1" id="Layer_1" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.8574 14.8549L1.14307 1.14062M1.14307 14.8549L14.8574 1.14062" stroke="#261A1A" stroke-width="1.5"/>
                  </svg>

                </div>

                <div
                  class="suggestions"
                  :style="`background-color: ${global_config.props.header_bg_color};color: ${global_config.props.header_text_color}`"
                  v-if="
                    showSearch2 &&
                      (searchData.suggestions && searchData.suggestions.length > 0 ||
                      searchData.productSuggestions && searchData.productSuggestions.length > 0 ||
                        searchData.noResults)
                  "
                >
                  <ul
                    class="suggestions__products"

                    v-if="searchData.productSuggestions && searchData.productSuggestions.length > 0"
                  >
                    <li
                      class="suggestions__products--item"
                      v-for="(data, index) in getProductSearchSuggestions2(
                        searchData.productSuggestions
                      )"
                      :key="index"
                      @click.stop.prevent="
                        showSearch2=false;
                        redirectToProduct(data.url);
                        searchtext = '';
                      "
                      v-bind:class="{
                        focus: isFocusedItem2(data),
                      }"
                    >
                      <div class="searchDataImage" v-if="index < 3 && getShowResultsTab">
                        <div class="imgF"><img :src="data.image.url" /></div>
                        <div class="textF">{{ data.name }}</div>
                        <div>{{ data.price.currency_symbol + data.price.max}}</div>
                      </div>
                    </li>
                  </ul>
                  <ul
                    v-if="
                    searchData.productSuggestions &&  searchData.productSuggestions.length === 0 &&
                  searchData.suggestions &&      searchData.suggestions.length === 0 &&
                        searchData.noResults &&
                        showSearch
                    "
                  >
                    <div
                      class="suggestions__products"
                      @click="redirectToProduct('/products/?q=' + searchtext2)"
                    >
                      <li class="suggestions__products--item">
                        No match found
                      </li>
                    </div>
                  </ul>
                  <div class="btnSearch" v-if="getShowResultsTab">
                    <button @click="redirectToProduct('/products/')">VIEW ALL 24 RESULTS</button>
                  </div>
                </div>
                <div class="mainHeading" v-if="!getShowResultsTab">
                  <div class="searchHeading">
                    <div class="text"><p>{{ context.navigation[context.navigation.length-1].display }}</p></div>
                    <div v-if="context.navigation[context.navigation.length-1].image"><img :src="context.navigation[context.navigation.length-1].image" style="width:16px" /></div>
                  </div>
                  <ul>
                    <li class="items" v-for="(data, index) in context.navigation[context.navigation.length-1].sub_navigation" :key="index">
                      <p>{{ data.display }}</p>
                    </li>
                    <br />
                  </ul>
                </div>
              </template>
            </fdk-search>
          </transition>
        </template>
      </fdk-accounts>
      <transition name="slide">
        <div class="hamburger" v-if="showHamburger" style="background-color: @HeaderBackground;color: @HeaderText;">
          <ul class="hamburger__navigation">
            <li
              class="hamburger__navigation--item"
              v-for="(nav, index) in navs"
              :key="index"
              @click.stop="redirectToMenu(nav)"
            >
              <p>{{ nav.display }}</p>
              <ul class="item-sub">
                    <li
                      class="hamburger__navigation--item back"
                      @click.stop="hideSubmenu(nav)"
                    >
                    <li
                      class="hamburger__navigation--item"
                      v-for="(subnav, idx) in nav.sub_navigation"
                      :key="idx"

                    >
                      <fdk-link :link="subnav.link">
                        <p>{{ subnav.display }}</p>
                      </fdk-link>
                    </li>
              </ul>
            </li>
          </ul>
          <div class="imgHover">
            <div class="img1">
              <img :src="getImg[1].img" />
              <div class="img-p">
                <p>{{ getImg[1].display }}</p>
              </div>
            </div>
            <div class="img2">
              <img :src="getImg[0].img" />
              <div class="img-p2">
                <p>{{ getImg[0].display }}</p>
              </div>
            </div>
          </div>
        </div>
      </transition>
      <div
        class="overlay"
        :class="{ show: showHamburger }"
        @click.stop="showHamburger = false"
      >
        &nbsp;
      </div>
    </div>

    <div class="mobile" :style="`border-bottom: 1px solid ${global_config.props.header_border_color}`">
      <div
        class="left"
        @click="
          showHamburgerMenu
        "
      >
        <!-- <IosMenuIcon w="1.875rem" h="1.875rem" /> -->
        <div v-if="!showHamburger">
          <svg width="24px" height="24px"
          
          version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 512 512" :style="`fill:${global_config.props.header_icon_color}`" xml:space="preserve">
            <g>
              <path d="M432,176H80c-8.8,0-16-7.2-16-16l0,0c0-8.8,7.2-16,16-16h352c8.8,0,16,7.2,16,16l0,0C448,168.8,440.8,176,432,176z"/>
              <path d="M432,272H80c-8.8,0-16-7.2-16-16l0,0c0-8.8,7.2-16,16-16h352c8.8,0,16,7.2,16,16l0,0C448,264.8,440.8,272,432,272z"/>
              <path d="M432,368H80c-8.8,0-16-7.2-16-16l0,0c0-8.8,7.2-16,16-16h352c8.8,0,16,7.2,16,16l0,0C448,360.8,440.8,368,432,368z"/>
            </g>
          </svg>
        </div>
        <div v-else class="close-icon" @click.stop="showHamburger = false">
            <!-- <MdCloseIcon w="3.5rem" h="3.5rem" /> -->
            <svg width="24px" height="24px" title="Close menu"
              version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                   viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve" :style="`fill:${global_config.props.header_icon_color}`">
                <g id="Icon_5_" >
                  <g>
                    <polygon points="405,136.798 375.202,107 256,226.202 136.798,107 107,136.798 226.202,256 107,375.202 136.798,405 256,285.798
                      375.202,405 405,375.202 285.798,256 		"/>
                  </g>
                </g>
            </svg>
        </div>
      </div>
      <fdk-link link="/" class="center-mobile">
        <img :src="context.logo.secure_url" alt />
      </fdk-link>
      <fdk-accounts class="right">
        <template slot-scope="accountsData">
          <div
                class="icon right__icons--search"
                @click="callSearch3"
              >
                <svg v-if="!showSearch" class="header-icons" width="1.125rem" height="1.125rem" title="Search"
                  version="1.1" id="Layer_1" viewBox="0 0 21 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="9.7615" cy="9.7615" r="8.7615" stroke="#261A1A" stroke-width="1.5"/>
                  <path d="M15.394 16.6484L19.7748 21.655" stroke="#261A1A" stroke-width="1.5"/>
                </svg>

                <svg width="1.875rem" height="1.875rem" class="header-icons" title="Close Search" v-else
                version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve" :style="`fill:${global_config.props.header_icon_color}`">
                  <g id="Icon_5_">
                    <g>
                      <polygon  points="405,136.798 375.202,107 256,226.202 136.798,107 107,136.798 226.202,256 107,375.202 136.798,405 256,285.798
                        375.202,405 405,375.202 285.798,256 		"/>
                    </g>
                  </g>
                </svg>
          </div>
          <div
                class="icon right__icons--bag"
                v-if="isMounted && !global_config.props.disable_cart"
                @click="checkLogin(accountsData, 'cart')"
              >
                <svg width="1.125rem" height="1.125rem" class="header-icons" title="Cart"
                  version="1.1" id="Layer_1" viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 8H1V23H17V8H13M5 8V5C5 2.79086 6.79086 1 9 1V1C11.2091 1 13 2.79086 13 5V8M5 8H13" stroke="#261A1A" stroke-width="1.5"/>
                </svg>

                <p class="cart-count u-df-align-center" :style="`background-color: ${global_config.props.header_cart_notification_bg_color};color: ${global_config.props.header_cart_notification_text_color};`">
                  {{ context.cart_item_count }}
                </p>
          </div>

          <transition name="slide-fade">
            <fdk-search class="search3" v-if="showSearch3" :has_products="true">
              <template slot-scope="searchData">
                <div class="inputarea">
                  <input
                    class="search__input"
                    placeholder="Enter your search"
                    type="text"
                    id="searchInput3"
                    autocomplete="off"
                    @keyup.enter="
                      showSearch3 = false;
                      selectedIndex3 === null
                        ? getEnterSearchData3(searchData)
                        : getSearchData3();
                    "
                    @keydown="onArrowKey3"
                    v-click-outside="hideList3"
                    v-on:focus="showSearch3 = true"
                    @input="fetchSuggestions3($event, searchData.fetchSuggestions)"
                  />
                </div>
                <div
                  @click="
                    showSearch3 = false;
                    searchtext3 = '';
                  "
                >
                  <svg width="1.15rem" height="1.875rem" class="arrow-icon"
                  version="1.1" id="Layer_1" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.8574 14.8549L1.14307 1.14062M1.14307 14.8549L14.8574 1.14062" stroke="#261A1A" stroke-width="1.5"/>
                  </svg>

                </div>

                <div
                  class="suggestions"
                  :style="`background-color: ${global_config.props.header_bg_color};color: ${global_config.props.header_text_color}`"
                  v-if="
                    showSearch3 &&
                      (searchData.suggestions && searchData.suggestions.length > 0 ||
                      searchData.productSuggestions && searchData.productSuggestions.length > 0 ||
                        searchData.noResults)
                  "
                >
                  <ul
                    class="suggestions__products"

                    v-if="searchData.productSuggestions && searchData.productSuggestions.length > 0"
                  >
                    <li
                      class="suggestions__products--item"
                      v-for="(data, index) in getProductSearchSuggestions3(
                        searchData.productSuggestions
                      )"
                      :key="index"
                      @click.stop.prevent="
                        showSearch3=false;
                        redirectToProduct(data.url);
                        searchtext3 = '';
                      "
                      v-bind:class="{
                        focus: isFocusedItem3(data),
                      }"
                    >
                      <div class="searchDataImage" v-if="index < 4 && getShowResultsMobile">
                        <div class="imgF"><img :src="data.image.url" /></div>
                        <div class="textF">
                          {{ data.name }}
                          <div>{{ data.price.currency_symbol + data.price.max}}</div>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <ul
                    v-if="
                    searchData.productSuggestions &&  searchData.productSuggestions.length === 0 &&
                  searchData.suggestions &&      searchData.suggestions.length === 0 &&
                        searchData.noResults &&
                        showSearch
                    "
                  >
                    <div
                      class="suggestions__products"
                      @click="redirectToProduct('/products/?q=' + searchtext3)"
                    >
                      <li class="suggestions__products--item">
                        No match found
                      </li>
                    </div>
                  </ul>
                  <div class="btnSearch" v-if="getShowResultsMobile">
                    <span @click="redirectToProduct('/products/')">VIEW ALL 24 RESULTS</span>
                  </div>
                </div>
                <div class="mainHeading" v-if="!getShowResultsMobile">
                  <div class="searchHeading">
                    <div class="text"><p>{{ context.navigation[context.navigation.length-1].display }}</p></div>
                    <div v-if="context.navigation[context.navigation.length-1].image"><img :src="context.navigation[context.navigation.length-1].image" style="width:16px" /></div>
                  </div>
                  <ul>
                    <li class="items" v-for="(data, index) in context.navigation[context.navigation.length-1].sub_navigation" :key="index">
                      <p>{{ data.display }}</p>
                    </li>
                    <br />
                  </ul>
                </div>
              </template>
            </fdk-search>
          </transition>
        </template>
      </fdk-accounts>
      <transition name="slide">
        <div class="hamburger" v-if="showHamburger" style="background-color: @HeaderBackground;color: @HeaderText;">
          <ul class="hamburger__navigation">
            <li
              class="hamburger__navigation--item"
              v-for="(nav, index) in navs"
              :key="index"
              @click.stop="redirectToMenu(nav)"
            >
              <app-accordion collapseStateIcon='Vector' expandedStateIcon='Vector2' gap_between="225">
                <template v-slot:title>
                  <div style="width: 49px; padding-bottom: 12px;"><p>{{ nav.display }}</p></div>
                </template>
                <template v-slot:content>
                  <ul class="item-sub">
                    <li
                      class="hamburger__navigation--item back"
                      @click.stop="hideSubmenu(nav)"
                    >
                    <li
                      class="hamburger__navigation--item"
                      v-for="(subnav, idx) in nav.sub_navigation"
                      :key="idx"

                    >
                      <fdk-link :link="subnav.link">
                        <p>{{ subnav.display }}</p>
                      </fdk-link>
                    </li>
                </ul>
                </template>
              </app-accordion>
              <div class="hrMain">
                <div class="hrTag"></div>
              </div>
            </li>
          </ul>
          <div class="hrMain2 ">
            <div class="hrTag"></div>
          </div>
          <div class="lowerPart">
            <fdk-accounts>
              <template slot-scope="accountsData">
                <div class="whistlistImg" v-if="isMounted" @click="checkLogin(accountsData, 'wishlist')">
                  <div>
                <svg class="header-icons" width="1.35rem" height="1.49rem" title="Wishlist"
                  version="1.1" id="Layer_1" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.9983 20.3335C11.9983 20.3335 20.6177 12.581 22.0066 9.9189C22.8746 8.25514 22.8246 6.63122 22.3948 5.28806C21.6945 3.16093 19.564 1.71094 17.3481 1.71094C16.0649 1.71094 14.8844 2.17803 13.9624 2.93104C13.2591 3.54326 12.5946 4.21164 11.9963 4.92758C11.398 4.21164 10.7337 3.54327 10.0303 2.93105C9.1083 2.17804 7.92784 1.71094 6.64458 1.71094C4.42865 1.71094 2.29822 3.16093 1.59788 5.28806C1.16807 6.63123 1.11805 8.25514 1.9861 9.91891C3.375 12.581 11.9983 20.3335 11.9983 20.3335Z" stroke="#261A1A" stroke-width="1.5"/>
                </svg>
              </div>
              <div>Wishlist</div>
                </div>
                <div class="signIn" v-if="isMounted" @click="checkLogin(accountsData, 'profile')">
                  <div>
                    <svg class="header-icons" width="1.35rem" height="1.49rem" title="Search"
                      version="1.1" id="Layer_1" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.8002 20.6H1.2002V19.8C1.2002 14.9399 5.14009 11 10.0002 11C14.8603 11 18.8002 14.9399 18.8002 19.8V20.6Z" stroke="#261A1A" stroke-width="1.5"/>
                      <path d="M5.2002 6.19844C5.2002 8.84941 7.34923 10.9984 10.0002 10.9984C12.6512 10.9984 14.8002 8.84941 14.8002 6.19844C14.8002 3.54747 12.6512 1.39844 10.0002 1.39844C7.34923 1.39844 5.2002 3.54747 5.2002 6.19844Z" stroke="#261A1A" stroke-width="1.5"/>
                    </svg>
                  </div>
                  <div>Sign in/ Registered</div>
                </div>
              </template>
            </fdk-accounts>
          </div>
        </div>
      </transition>
      <div
        class="overlay"
        :class="{ show: showHamburger }"
        @click.stop="showHamburger = false"
      >
        &nbsp;
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { detectMobileWidth } from "../../helper/utils";
import Accordion from './../../components/common/accordion.vue'
export default {
  components: {
    'app-accordion': Accordion,
  },
  props: {
    context: {},
  },
  data() {
    return {
      showSearch: false,
      showSearch2: false,
      showSearch3: false,
      searchtext: "",
      searchtext2: "",
      searchtext3: "",
      showHamburger: false,
      showSubMenu: false,
      selectedIndex: null,
      selectedIndex2: null,
      selectedIndex3: null,
      suggestion: [],
      suggestion2: [],
      suggestion3: [],
      productSuggestions: [],
      productSuggestions2: [],
      productSuggestions3: [],
      isMounted: false,
      navs: [],
      isShow: false,
      getImg: [],
      getShowResultsDesktop: false,
      getShowResultsTab: false,
      getShowResultsMobile: false
    };
  },
  watch:{
    $route (to, from) {
      this.hideHamburgerMenu()
    }
  },
  mounted()  {
    this.isMounted = true
    this.navs = this.getNavs();
    this.isShow = this.updateFun();
    this.getImage();
  },
  computed: {
    accessibleItems() {
      return this.productSuggestions.concat(this.suggestion);
    },
  },
  methods: {
    getImage() {
      for(let i = 0; i < this.context.navigation.length; i++) {
        for(let j = 0; j < this.context.navigation[i].sub_navigation.length; j++) {
          if(this.context.navigation[i].sub_navigation[j].image) {
            this.getImg.push({"img":this.context.navigation[i].sub_navigation[j].image, "display":this.context.navigation[i].sub_navigation[j].display});
          }
        }
      }
    },
    updateFun(){
      let ans = false;
      for(let i = 0; i < this.context.navigation.length; i++) {
        for(let j = 0; j < this.context.navigation[i].sub_navigation.length; j++) {
          if(this.context.navigation[i].sub_navigation[j].image) {
            ans = true;
            break;
          }
        }
      }
      return ans;
    },
    showHamburgerMenu() {
      this.navs.map(nav => {
        if( nav.sub_navigation) {
            nav.sub_navigation.showSubMenu = false
        }
      })
      this.showHamburger = true;
    },
    hideHamburgerMenu() {
      this.navs.map(nav => {
        if( nav.sub_navigation) {
            nav.sub_navigation.showSubMenu = false
        }
      })
      this.showHamburger = false;
    },
    getNavs() {
      if(this.context.navigation) {
        let navigations =  this.context.navigation.map(nav => {
          if (nav.sub_navigation) {
            nav.showSubMenu = false
          }
          return nav;
        })
        return Object.assign([], navigations);
      }
    },
    callSearch() {  
      this.selectedIndex = null;
      this.showSearch = !this.showSearch;
      if (this.showSearch) {
        setTimeout(function() {
          document.getElementById("searchInput").focus();
        }, 1500);
      }
    },
    callSearch2() {  
      this.selectedIndex2 = null;
      this.showSearch2 = !this.showSearch2;
      if (this.showSearch2) {
        setTimeout(function() {
          document.getElementById("searchInput2").focus();
        }, 1500);
      }
    },
    callSearch3() {  
      this.selectedIndex3 = null;
      this.showSearch3 = !this.showSearch3;
      if (this.showSearch3) {
        setTimeout(function() {
          document.getElementById("searchInput3").focus();
        }, 1500);
      }
    },
    getSearchData() {
      let path = this.accessibleItems[this.selectedIndex].url;
      this.$router.push({ path: path });
      this.showlist = false;
    },
    getSearchData2() {
      let path = this.accessibleItems[this.selectedIndex2].url;
      this.$router.push({ path: path });
      this.showlist2 = false;
    },
    getSearchData3() {
      let path = this.accessibleItems[this.selectedIndex3].url;
      this.$router.push({ path: path });
      this.showlist3 = false;
    },
    getEnterSearchData: function getEnterSearchData(searchData) {
      this.showlist = false;
      searchData.executeQuery(this.searchtext);
    },
    getEnterSearchData2: function getEnterSearchData2(searchData) {
      this.showlist = false;
      searchData.executeQuery(this.searchtext2);
    },
    getEnterSearchData3: function getEnterSearchData3(searchData) {
      this.showlist = false;
      searchData.executeQuery(this.searchtext3);
    },
    isFocusedItem(item) {
      const selectedItem = this.accessibleItems[this.selectedIndex];
      if (selectedItem && item.display) {
        return item.display === selectedItem.display;
      } else if (selectedItem && item.name) {
        return item.name === selectedItem.name;
      }
      return false;
    },
    isFocusedItem2(item) {
      const selectedItem = this.accessibleItems[this.selectedIndex2];
      if (selectedItem && item.display) {
        return item.display === selectedItem.display;
      } else if (selectedItem && item.name) {
        return item.name === selectedItem.name;
      }
      return false;
    },
    isFocusedItem3(item) {
      const selectedItem = this.accessibleItems[this.selectedIndex3];
      if (selectedItem && item.display) {
        return item.display === selectedItem.display;
      } else if (selectedItem && item.name) {
        return item.name === selectedItem.name;
      }
      return false;
    },
    getSearchResults(item) {
      this.suggestion = item;
      return item;
    },
    getSearchResults2(item) {
      this.suggestion2 = item;
      return item;
    },
    getSearchResults3(item) {
      this.suggestion3 = item;
      return item;
    },
    getProductSearchSuggestions(item) {
      this.productSuggestions = item;
      return item;
    },
    getProductSearchSuggestions2(item) {
      this.productSuggestions2 = item;
      return item;
    },
    getProductSearchSuggestions3(item) {
      this.productSuggestions3 = item;
      return item;
    },
    onArrowKey: function(event) {
      const KEY_UP = 38;
      const KEY_DOWN = 40;
      switch (event.keyCode) {
        case KEY_UP:
          if (this.selectedIndex === null) {
            this.selectedIndex = 0;
          } else if (this.selectedIndex > 0) {
            this.selectedIndex--;
          }
          break;
        case KEY_DOWN:
          if (this.selectedIndex === null) {
            this.selectedIndex = 0;
          } else if (this.selectedIndex < this.accessibleItems.length - 1) {
            this.selectedIndex++;
          }
          break;
      }
    },
    onArrowKey2: function(event) {
      const KEY_UP = 38;
      const KEY_DOWN = 40;
      switch (event.keyCode) {
        case KEY_UP:
          if (this.selectedIndex2 === null) {
            this.selectedIndex2 = 0;
          } else if (this.selectedIndex2 > 0) {
            this.selectedIndex2--;
          }
          break;
        case KEY_DOWN:
          if (this.selectedIndex2 === null) {
            this.selectedIndex2 = 0;
          } else if (this.selectedIndex2 < this.accessibleItems.length - 1) {
            this.selectedIndex2++;
          }
          break;
      }
    },
    onArrowKey3: function(event) {
      const KEY_UP = 38;
      const KEY_DOWN = 40;
      switch (event.keyCode) {
        case KEY_UP:
          if (this.selectedIndex3 === null) {
            this.selectedIndex3 = 0;
          } else if (this.selectedIndex3 > 0) {
            this.selectedIndex3--;
          }
          break;
        case KEY_DOWN:
          if (this.selectedIndex3 === null) {
            this.selectedIndex3 = 0;
          } else if (this.selectedIndex3 < this.accessibleItems.length - 1) {
            this.selectedIndex3++;
          }
          break;
      }
    },
    checkLogin(accountsData, type) {
      if (type === "cart") {
        this.$router.push("/cart/bag/");
      } else if (!accountsData.is_logged_in) {
        accountsData.openLogin();
      } else {
        if (type === "profile") this.$router.push("/profile/details");
        else if (type === "profile_mobile") this.$router.push("/profile");
        else if (type === "wishlist") this.$router.push("/wishlist");
      }
    },
    redirectToPage(nav) {
      this.$router.push("/");
    },
    redirectToProduct(link) {
      this.$router.push(link);
      this.showSearch = false;
    },
    redirectToMenu(menu) {
      if (!menu.sub_navigation.length) {
        this.showHamburger = false;
        this.navs = this.getNavs();
        this.$router.push(menu.link);
      } else {
        let navigatons = Object.assign([],this.navs)
        navigatons.map(nav => {
          if( nav.sub_navigation) {
            if(nav.display == menu.display) {
              nav.sub_navigation.showSubMenu = true
            } else {
              nav.sub_navigation.showSubMenu = false
            }
          }
        })
        this.navs = navigatons;
      }
    },
    hideSubmenu(menu) {
      let navigatons = Object.assign([],this.navs)
        navigatons.map(nav => {
          if( nav.sub_navigation) {
            if(nav.display == menu.display) {
              nav.sub_navigation.showSubMenu = false
            }
          }
        })
        this.navs = navigatons;
    },
    hideList: function hideList(event) {
      setTimeout(() => {
        this.showSearch = false;
        this.searchtext = "";
      }, 200);
    },
    hideList2: function hideList(event) {
      setTimeout(() => {
        this.showSearch2 = false;
        this.searchtext2 = "";
      }, 200);
    },
    hideList3: function hideList(event) {
      setTimeout(() => {
        this.showSearch3 = false;
        this.searchtext3 = "";
      }, 200);
    },
    fetchSuggestions(evt, fetchSuggestionsAction) {
      this.selectedIndex = null;
      this.showSearch = true;
      this.searchtext = evt.target.value;
      if(evt.target.value) {  
        this.getShowResultsDesktop = true;
      }
      fetchSuggestionsAction(this.searchtext);
    },
    fetchSuggestions2(evt, fetchSuggestionsAction) {
      this.selectedIndex2 = null;
      this.showSearch2 = true;
      this.searchtext2 = evt.target.value;
      if(evt.target.value) {  
        this.getShowResultsTab = true;
      }
      fetchSuggestionsAction(this.searchtext2);
    },
    fetchSuggestions3(evt, fetchSuggestionsAction) {
      this.selectedIndex3 = null;
      this.showSearch3 = true;
      this.searchtext3 = evt.target.value;
      if(evt.target.value) {  
        this.getShowResultsMobile = true;
      }
      fetchSuggestionsAction(this.searchtext3);
    },
    routetoSettingPage() {
      if (detectMobileWidth()) {
        this.$router.push("/setting");
      } else {
        this.$router.push("/setting/currency");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.header-wrap {
  margin-bottom: 114px;
  position: relative;
  z-index: 10 !important;
  @media @tablet {
    margin-bottom: 74px;
  }
  &.isPreview {
    margin-bottom: 0;
  }
  .header {
    position: fixed;
    top: 0;
    width: 100%;
    background-color: @HeaderBackground;
    color: @HeaderText;
    .desktop {
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 0.625rem 6.5rem;
      // background-color: @color-white;
      // min-height: 4.375rem;
      align-items: center;
      // border-bottom: 1px solid @border-color;
      position: relative;

      @media screen and (max-width: 1400px) {
        padding: 0.625rem 5rem;
      }
      @media screen and (max-width: 1120px) {
        display: none;
      }
    }
  }
  //left
  .left {
    display: flex;
    align-items: flex-start;
  }
  .center-cont {
    width: auto;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    max-height: 82px;
    &__logo {
      img {
        max-height: 82px;
      }
    }
  }

  //navigation
  .l1-navigation-list {
    display: flex;
    &__item {
      .nav-img {
        display: flex;
        align-items: center;
      }
      padding: 32px 0;
      position: relative;
      cursor: pointer;
      font-size: 14px;
      &:hover {
        color: var(--header_nav_hover_color);
      }
    }
  }

  .l2-navigation-list {
    position: absolute;
    min-width: 23rem;
    border: 1px solid @border-color;
    background-color: @color-white;
    z-index: 999;
    top: 110px;
    left: -100%;
    color: @color-gray;
    opacity: 0;
    visibility: hidden;
    transition: all 0.4s;
    display: none;
    &__item {
      p {
        padding: 18px 30px;
        font-weight: 500;
        display: block;
      }
      &:hover {
        color: var(--header_nav_hover_color);
      }
    }
  }

  .l2-navigation-list2 {
    position: absolute;
    min-width: 23rem;
    border: 1px solid @border-color;
    background-color: @color-white;
    z-index: 999;
    top: 110px;
    left: -100%;
    color: @color-gray;
    opacity: 0;
    visibility: hidden;
    transition: all 0.4s;
    display: none;
    &__item {
      p {
        padding: 18px 30px;
        font-weight: 500;
        display: block;
      }
      &:hover {
        color: var(--header_nav_hover_color);
      }
    }
  }
  .submenu {
    display: none;
    &__item {
      p {
        padding: 18px 30px;
        font-weight: 500;
        display: block;
      }
      &:hover {
        color: var(--header_nav_hover_color);
      }
    }
  }
  .imgHover {
    display: none;
  }

  .l3-navigation-list {
    &__item {
      p {
        padding: 18px 30px;
        display: block;    
        font-weight: unset;
      }
      &:hover {
        color: var(--header_nav_hover_color);
      }
    }
  }
  //right
  .right {
    &__icons {
      display: flex;
      position: relative;
      .icon {
        cursor: pointer;
      }
      &--bag {
        position: relative;
        .cart-count {
          position: absolute;
          height: 1.25rem ;
          width: 1.2rem ;
          background-color: @primary-color;
          border-radius: 50%;
          justify-content: center;
          font-weight: bold;
          color: white;
          top: 20px;
          left: 15px;
          font-size: 10px;
        }
      }

    }
    .setting {
      text-align: center;
      height: 30px;
      width: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      @media @tablet {
        height: 24px;
      }
      svg {
        cursor: pointer;
        fill: var(--header_icon_color, @color-black);
        width: 24px;
        height: 24px;
        @media @tablet {
          width: 22px;
          height: 22px;
        }
      }
    }

  }

  //search-input
  .search {
    position: absolute;
    width: 94.5rem;
    height: 460px;
    top: 99px;
    left: -475%;
    z-index: 10;
    background-color: @HeaderBackground;
    color: @HeaderText;
    &__input {
      width: 100%;
      padding: 0.625rem;
      font-size: 0.875rem;
      height: 3.125rem;
      padding-right: 1.875rem;
      box-sizing: border-box;
      border-left: hidden;
      border-right: hidden;
      border-top: hidden;
      background-color: @HeaderBackground;
    }
    .arrow-icon {
      cursor: pointer;
      position: absolute;
      top: 12px;
      right: 9%;
    }
    .mainHeading{
      padding-top: unset;
      padding-left: 72px;
      .searchHeading {
        display: flex;
        .text {
          p {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 500;
            font-size: 16px;
            line-height: 20px;
          }
        }
      }
      .items {
        padding-top: 14px;
      }
    }
    .inputarea {
      padding-left: 72px;
      width: 1310px;
    }
    .btnSearch {
      cursor: pointer;
      padding-left: 570px;
      padding-bottom: 40px;
      padding-top: 25px;
      button {
        width: 300px;
        height: 48px;
        color: @ButtonSecondary;
        background-color: @ButtonPrimary;
      }
    }
  }

  //suggestions
  .suggestions {
    width: 100%;
    padding-left: 72px;
    padding-right: 72px;
    padding-top: 50px;
    .searchDataImage {
      .imgF {
        img {
          width: 206px;
          height: auto;
          aspect-ratio: 3/4;
          object-fit: cover;
        }
      }
      .textF {
        padding-top: 16px;
        width: 206px;
      }
    }
  }
  .suggestions__products {
    display: flex;
    &--item {
      cursor: pointer;
      align-items: center;
      font-family: 'Inter';
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
      // &:not(:last-child) {
      //   border-bottom: 1px solid @border-color;
      // }
      img {
        width: 1.875rem;
        margin-right: 1.25rem ;
      }
    }
    .focus {
      background: @color-gray-1;
    }
  }

  //animations

  .l1-navigation-list__item:hover {
    .dropdown-icon {
      svg {
        fill: var(--header_nav_hover_color) !important;
      }
    }
    .l2-navigation-list {
      visibility: visible;
      opacity: 1;
      top: 95px;
      left: 0;
      right: 0;
      position: fixed;
      display: flex;
      padding-left: 72px;
      background-color: @HeaderBackground;
      color: @HeaderText;
    }
    .l2-navigation-list2 {
      visibility: visible;
      opacity: 1;
      top: 95px;
      left: 0;
      right: 0;
      position: fixed;
      display: grid;
      grid-template-columns: repeat(4, 192px);
      padding-left: 72px;
      padding-top: 32px;
      background-color: @HeaderBackground;
      color: @HeaderText;
    }
    .submenu {
      width: 100%;
      height: auto;
      visibility: visible;
      opacity: 1;
      left: 0;
      position: fixed;
      display: flex;
      .img-p {
        background-color: #ECE5DC;
        width: 336px;
        height: 40px;
        p {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 20px;
          padding-left: 15px;
          padding-top: 9px;
        }
      }
      .img-p2 {
        background-color: #ECE5DC;
        width: 224px;
        height: 40px;
        p {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 20px;
          padding-left: 15px;
          padding-top: 9px;
        }
      }
      .overlay {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 100px;
        background-color: #000;
        opacity: 0;
        transition: all 0.4s;
        visibility: hidden;
        cursor: pointer;
      }
      .show {
        opacity: 0.5;
        visibility: visible;
      }
    }
    .imgHover {
      display: flex;
      left: 0;
      gap: 16px;
      z-index: 999;
      position: relative;
      left: 870px;
      top: 46px;
      padding-top: 32px;
      .img1 {
        img {
          width: 336px;
          height: 336px;
          aspect-ratio: 1/1;
          object-fit: cover;
        }
      }
      .img2 {
        img {
          width: 224px;
          height: 336px;
          aspect-ratio: 2/3;
          object-fit: cover;
        }
      }
    }
  }

  //tab-styles
  .tab {
    display: none;
    padding: 1.25rem;
    position: relative;

    @media screen and (min-width: 481px) and (max-width: 1120px) {
      display: flex;
      border-bottom: 1px solid @border-color;
    }

    align-items: center;
    justify-content: space-between;
    .left {
      cursor: pointer;
    }
    .icon {
      svg {
        width: 24px;
        height: 24px;
      }
      &.mr-5 {
        margin-right: 0 !important;
      }
      margin-left: 10px;
      &.setting {
        margin-left: 15px;//offsetting for cart count space;
        svg {
          width: 20px;
          height: 20px;
        }
      }
    }
    .center-mobile {
      cursor: pointer;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      width: 100px;

      @media @tablet {
        width: 30%;
      }
      @media @mobile {
        width: 35%;
      }
      @media @xsm-mobile {
        width: 25%;
      }
      img {
        max-width: 100%;
        max-height: 75px;
        @media @tablet {
          max-height: 70px;
        }
        @media @mobile {
          max-height: 45px;
        }
      }
    }
    .right {
      display: flex;
      gap: 16px;
      .cart-count {
        top: -5px;
        left: 14px;
        width: 16px;
        height: 16px;
      }
      .search2 {
        position: absolute;
        top: 67px;
        width: 100%;
        left: 2px;
        z-index: 10;
        background-color: @HeaderBackground;
        color: @HeaderText;
        &__input {
          width: 100%;
          padding: 0.625rem;
          font-size: 0.875rem;
          height: 3.125rem;
          padding-right: 1.875rem;
          box-sizing: border-box;
          border-left: hidden;
          border-right: hidden;
          border-top: hidden;
          background-color: #F9F7F4;
        }
        .arrow-icon {
          cursor: pointer;
          position: absolute;
          top: 38px;
          right: 9%;
        }
        .mainHeading{
          padding-top: unset;
          padding-left: 32px;
          .searchHeading {
            display: flex;
            .text {
              p {
                font-family: 'Inter';
                font-style: normal;
                font-weight: 500;
                font-size: 16px;
                line-height: 20px;
              }
            }
          }
          .items {
            padding-top: 14px;
          }
        }
        .inputarea {
          padding-left: 32px;
          width: 710px;
          padding-top: 32px;
        }
        .btnSearch {
          cursor: pointer;
          padding-left: 221px;
          padding-bottom: 40px;
          padding-top: 25px;
          button {
            width: 300px;
            height: 48px;
            color: @ButtonSecondary;
            background-color: @ButtonPrimary;
          }
        }
        .suggestions {
          width: 100%;
          padding-left: 32px;
          padding-right: 32px;
          padding-top: 50px;
          .searchDataImage {
            .imgF {
              img {
                width: 206px;
                height: auto;
                aspect-ratio: 3/4;
                object-fit: cover;
              }
            }
            .textF {
              padding-top: 16px;
              width: 206px;
            }
          }
        }
        .suggestions__products {
          display: flex;
          &--item {
            cursor: pointer;
            align-items: center;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 500;
            font-size: 16px;
            line-height: 20px;
            img {
              width: 1.875rem;
              margin-right: 1.25rem ;
            }
            &:hover {
              background: @color-gray-1;
            }
          }
          .focus {
            background: @color-gray-1;
          }
        }
      }
    }

    .hamburger {
      position: fixed;
      top: 67px;
      left: 0;
      width: 48rem;
      height: 100%;
      z-index: 4;
      font-size: 1rem;
      font-weight: 500;
      color: @color-gray;
      // text-transform: uppercase;
      box-sizing: border-box;
      padding: 0.625rem;
      box-shadow: 0 2.5rem 3.125rem rgba(0, 0, 0, 0.4);
      background-color: @HeaderBackground;
      color: @HeaderText;
      @media @mobile {
        width: 21.875rem;
      }
      .close-icon {
        padding: 1.25rem 1.25rem 1.25rem 1.475rem;
        width: 2.1875rem;
        padding-bottom: 0;
        cursor: pointer;
        svg {
          width: 35px;
          height: 35px;
        }
      }
      &__navigation {
        display: flex;
        gap: 120px;
        padding-left: 32px;
        &--item {
          padding-top: 16px;
          transition: all 0.4s;
          cursor: pointer;
          .item-sub {
            transition: all 0.4s;
            cursor: pointer;
            text-align-last: start;
          }
        }
      }
      &__search {
        width: 17.5rem;
        position: relative;
        .icon {
          position: absolute;
          top: 9px;
          right: 10px;
          transition: all 0.4s;
          opacity: 0.5;
        }
        .mobile {
          padding: 0 3.125rem 0 1.25rem ;
          transition: all 0.4s;
          border: 1px solid @color-black;
        }
        .mobile:placeholder-shown {
          border: 1px solid @border-color;
        }
      }
      .imgHover {
        display: flex;
        gap: 16px;
        padding-top: 32px;
        padding-left: 32px;
        .img1 {
          img {
            width: 387px;
            height: 336px;
            aspect-ratio: 1/1;
            object-fit: cover;
          }
        }
        .img2 {
          img {
            width: 261px;
            height: 336px;
            aspect-ratio: 2/3;
            object-fit: cover;
          }
        }
        .img-p {
        background-color: #ECE5DC;
        width: 387px;
        height: 40px;
        p {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 20px;
          padding-left: 15px;
          padding-top: 9px;
        }
        }
        .img-p2 {
          background-color: #ECE5DC;
          width: 261px;
          height: 40px;
          p {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 20px;
            padding-left: 15px;
            padding-top: 9px;
          }
        }
      }
    }
    .overlay {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 67px;
      left: 0;
      background-color: @color-black;
      opacity: 0;
      transition: all 0.4s;
      z-index: 2;
      visibility: hidden;
      cursor: pointer;
    }
    .show {
      opacity: 0.5;
      visibility: visible;
    }
    .back {
      &__icon {
        transform: rotate(90deg);
        transition: all 0.4s;
      }

    }
    &__subnav {
      box-shadow: none !important ;
      .hamburger__navigation--item:nth-child(2) {
        padding-top: 16px;
      }
      .hamburger__navigation--item {
        padding-top: 15px;
        padding-bottom: 15px;
      }
    }
  }

  //mobile-styles
  .mobile {
    display: none;
    padding: 1.25rem;
    position: relative;

    @media screen and (min-width: 0px) and (max-width: 480px) {
      display: flex;
      border-bottom: 1px solid @border-color;
    }
    align-items: center;
    justify-content: space-between;
    .left {
      cursor: pointer;
    }
    .icon {
      svg {
        width: 24px;
        height: 24px;
      }
      &.mr-5 {
        margin-right: 0 !important;
      }
      margin-left: 10px;
      &.setting {
        margin-left: 15px;//offsetting for cart count space;
        svg {
          width: 20px;
          height: 20px;
        }
      }
    }
    .center-mobile {
      cursor: pointer;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      width: 100px;

      @media @tablet {
        width: 30%;
      }
      @media @mobile {
        width: 35%;
      }
      @media @xsm-mobile {
        width: 25%;
      }
      img {
        max-width: 100%;
        max-height: 75px;
        @media @tablet {
          max-height: 70px;
        }
        @media @mobile {
          max-height: 45px;
        }
      }
    }
    .right {
      display: flex;
      gap: 16px;
      .cart-count {
        top: -5px;
        left: 14px;
        width: 16px;
        height: 16px;
      }
      .search3 {  
        position: absolute;
        top: 67px;
        width: 100%;
        left: 2px;
        z-index: 10;
        background-color: @HeaderBackground;
        color: @HeaderText;
        &__input {
          width: 100%;
          padding: 0.625rem;
          font-size: 0.875rem;
          height: 3.125rem;
          padding-right: 1.875rem;
          box-sizing: border-box;
          border-left: hidden;
          border-right: hidden;
          border-top: hidden;
          background-color: #F9F7F4;
        }
        .arrow-icon {
          cursor: pointer;
          position: absolute;
          top: 38px;
          right: 9%;
        }
        .mainHeading{
          padding-top: unset;
          padding-left: 16px;
          .searchHeading {
            display: flex;
            .text {
              p {
                font-family: 'Inter';
                font-style: normal;
                font-weight: 500;
                font-size: 16px;
                line-height: 20px;
              }
            }
          }
          .items {
            padding-top: 14px;
          }
        }
        .inputarea {
          padding-left: 21px;
          width: 325px;
          padding-top: 32px;
        }
        .btnSearch {
          cursor: pointer;
          padding-bottom: 40px;
          span {
            text-decoration-line: underline;
            padding-left: 78px;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 500;
            font-size: 12px;
            line-height: 20px;
          }
        }
        .suggestions {
          width: 100%;
          padding-left: 32px;
          padding-right: 32px;
          padding-top: 50px;
          .searchDataImage {
            display: flex;
            .imgF {
              img {
                width: 60px;
                height: auto;
                aspect-ratio: 3/4;
                object-fit: cover;
              }
            }
            .textF {
              padding-top: 16px;
              width: 206px;
            }
          }
        }
        .suggestions__products {
          display: flex;
          flex-direction: column;
          gap: 12px;
          &--item {
            cursor: pointer;
            align-items: center;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 500;
            font-size: 14px;
            line-height: 20px;
            img {
              width: 1.875rem;
              margin-right: 1.25rem ;
            }
            &:hover {
              background: @color-gray-1;
            }
          }
          .focus {
            background: @color-gray-1;
          }
        }
      }
    }

    .hamburger {
      position: fixed;
      top: 67px;
      left: 0;
      width: 48rem;
      height: 100%;
      z-index: 4;
      font-size: 1rem;
      font-weight: 500;
      color: @color-gray;
      // text-transform: uppercase;
      box-sizing: border-box;
      padding: 0.625rem;
      box-shadow: 0 2.5rem 3.125rem rgba(0, 0, 0, 0.4);
      background-color: @HeaderBackground;
      color: @HeaderText;
      @media @mobile {
        width: 24rem;
      }
      .close-icon {
        padding: 1.25rem 1.25rem 1.25rem 1.475rem;
        width: 2.1875rem;
        padding-bottom: 0;
        cursor: pointer;
        svg {
          width: 35px;
          height: 35px;
        }
      }
      &__navigation {
        padding-left: 16px;
        .hrMain {
          .hrTag {
            border: 1px solid #D4D2D1;
            width: 288px;
          }
        }
        &--item {
          padding-top: 16px;
          transition: all 0.4s;
          cursor: pointer;
          .item-sub {
            transition: all 0.4s;
            cursor: pointer;
            text-align-last: start;
          }
        }
      }
      &__search {
        width: 17.5rem;
        position: relative;
        .icon {
          position: absolute;
          top: 9px;
          right: 10px;
          transition: all 0.4s;
          opacity: 0.5;
        }
        .mobile {
          padding: 0 3.125rem 0 1.25rem ;
          transition: all 0.4s;
          border: 1px solid @color-black;
        }
        .mobile:placeholder-shown {
          border: 1px solid @border-color;
        }
      }
      .imgHover {
        display: flex;
        gap: 16px;
        padding-top: 32px;
        padding-left: 32px;
        .img1 {
          img {
            width: 387px;
            height: 336px;
            aspect-ratio: 1/1;
            object-fit: cover;
          }
        }
        .img2 {
          img {
            width: 261px;
            height: 336px;
            aspect-ratio: 2/3;
            object-fit: cover;
          }
        }
        .img-p {
        background-color: #ECE5DC;
        width: 387px;
        height: 40px;
        p {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 20px;
          padding-left: 15px;
          padding-top: 9px;
        }
        }
        .img-p2 {
          background-color: #ECE5DC;
          width: 261px;
          height: 40px;
          p {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 20px;
            padding-left: 15px;
            padding-top: 9px;
          }
        }
      }
      .lowerPart {
        .whistlistImg {
          display: flex;
          gap: 12px;
          padding-top: 16px;
          padding-left: 16px;
        }
        .signIn {
          display: flex;
          gap: 12px;
          padding-top: 16px;
          padding-left: 16px;
        }
      }
      .hrMain2 {
        padding-top: 26px;
        padding-left: 16px;
        .hrTag {
          border: 1px solid #D4D2D1;
          width: 288px;
        }
      }
    }
    .overlay {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 67px;
      left: 0;
      background-color: @color-black;
      opacity: 0;
      transition: all 0.4s;
      z-index: 2;
      visibility: hidden;
      cursor: pointer;
    }
    .show {
      opacity: 0.5;
      visibility: visible;
    }
    .back {
      &__icon {
        transform: rotate(90deg);
        transition: all 0.4s;
      }

    }
    &__subnav {
      box-shadow: none !important ;
      .hamburger__navigation--item:nth-child(2) {
        padding-top: 16px;
      }
      .hamburger__navigation--item {
        padding-top: 15px;
        padding-bottom: 15px;
      }
    }
  }
  .icon {
    cursor: pointer;
  }
}
.header-wrap-menu-below {
  @media @desktop {
    margin-bottom: 190px;
  }
  .desktop-nav {
    flex-direction: column-reverse;
    .right-nav {
      flex-direction: row;
      display: flex;
      width: 100%;
      justify-content: flex-end;
    }
  }
}

</style>
