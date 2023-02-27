<template>
  <div class="plp-wrapper section-margin-db">
    <plp-loader class="loader-ws" v-if="context.loading && (!context.items || context.items.length === 0)"></plp-loader>

    <div v-else-if="
      !context.loading && (!context.items || context.items.length === 0)
    ">
      <fdk-empty-state :title="'No items found'"></fdk-empty-state>
    </div>
    <div v-else-if="context.page_error && context.page_error.statusCode === 500">
      <fdk-empty-state :title="'Something went wrong'"></fdk-empty-state>
    </div>
    <template v-else-if="context && context.items">
      <div v-if="page_config.props.pCount" class="count_head  font-body">
        <div>Total number of products</div>
        <div>({{ context.product_count }})</div>
      </div>
      <div class="mobile-header mobile">
        <div class="m-header">
          <div class="m-action-container" ref="mobileActionContainer">
            <div class="m-action-child-container" v-if="!is480width" v-on:click="viewModal($event, 'filter')">

              <div class="regular-xxxs">
                FILTER
                <span class="text-seperator"></span>
              </div>
              <div>
                <!-- FILTER ICON -->
                <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5.36667 12V8.25H6.36667V9.63333H12.25V10.6333H6.36667V12H5.36667ZM0.25 10.6333V9.63333H4.36667V10.6333H0.25ZM3.36667 7.86667V6.5H0.25V5.5H3.36667V4.1H4.36667V7.86667H3.36667ZM5.36667 6.5V5.5H12.25V6.5H5.36667ZM8.13333 3.75V0H9.13333V1.36667H12.25V2.36667H9.13333V3.75H8.13333ZM0.25 2.36667V1.36667H7.13333V2.36667H0.25Z"
                    fill="#26201A" />
                </svg>

              </div>
            </div>
            <div class="m-action-child-container" v-else v-on:click="viewModal($event, 'filter480')">

              <div class="regular-xxxs">
                FILTER
                <span class="text-seperator"></span>
              </div>
              <div>
                <!-- FILTER ICON -->
                <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5.36667 12V8.25H6.36667V9.63333H12.25V10.6333H6.36667V12H5.36667ZM0.25 10.6333V9.63333H4.36667V10.6333H0.25ZM3.36667 7.86667V6.5H0.25V5.5H3.36667V4.1H4.36667V7.86667H3.36667ZM5.36667 6.5V5.5H12.25V6.5H5.36667ZM8.13333 3.75V0H9.13333V1.36667H12.25V2.36667H9.13333V3.75H8.13333ZM0.25 2.36667V1.36667H7.13333V2.36667H0.25Z"
                    fill="#26201A" />
                </svg>

              </div>
            </div>
            <div class="m-action-child-container" v-on:click="viewModal($event, 'sort')">

              <div class="regular-xxxs">
                SORT
                <span class="text-seperator"></span>
              </div>
              <div>
                <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M1.83398 11.3337H3.00065V3.33366H4.75065L2.41732 0.666992L0.0839844 3.33366H1.83398V11.3337ZM9.41732 8.66699H7.66732V0.666992H6.50065V8.66699H4.75065L7.08398 11.3337L9.41732 8.66699Z"
                    fill="#26201A" />
                </svg>

                <!-- SORT ICON -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="desktop-header desktop">
        <div class="header">
          <div class="m-action-container">
            <div class="left" v-click-outside="closeMyOption">
              <div class="filter-list" v-for="(filter, idx) in getFilters" :key="idx + '-desktop' + filter.key.display">
                <div class="filters">
                  <div class="filter-title regular-sm" v-on:click="clickedFilter(idx)" v-if="filter.values.length > 0">
                    <span class="plp_filter_name_desktop cl-Mako fil_tit font-body">{{ filter.key.display }}</span>
                    <span v-bind:class="{ 'filter-arrow-up': !filter.isOpen, }">
                      <!-- Arrow icon -->
                      <svg-wrapper :svg_src="'arrow-dropdown-black'"></svg-wrapper>
                    </span>
                  </div>
                  <div class="filter-disp filter-disp-adv" v-bind:class="{ open: filter.isOpen }"
                    v-if="filter.key.kind == 'multivalued'">
                    <div class="example example-adv"
                      v-bind:class="{ 'example-clr-adv': filter.key.name === 'primary_color', }">
                      <ul class="filter-items-container filter-items-container-adv " id="scroll-bar"
                        v-if="filter.key.name !== 'primary_color'">
                        <li v-for="(filterItem, index) in filter.filteredValues" :key="'filter-desktop' + index">
                          <fdk-link :link="filterItem.url">
                            <div class="filter-item filter-item-adv">
                              <div class="filter-item-i" v-if="!filterItem.is_selected">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                  xmlns="http://www.w3.org/2000/svg">
                                  <rect width="16" height="16" stroke-width="2" stroke="#26201A" />
                                </svg>

                              </div>
                              <div v-if="filterItem.is_selected" class="filter-item-i">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                  xmlns="http://www.w3.org/2000/svg">
                                  <rect width="16" height="16" rx="2" fill="#26201A" />
                                  <path d="M4 8L6.5 11L13 5" stroke="#F9F7F4" />
                                </svg>
                              </div>

                              <div class="filter-item-value plp_filter_value font-body "
                                :class="{ active: filterItem.is_selected == true, }">
                                {{ filterItem.display }}
                              </div>
                            </div>
                          </fdk-link>
                        </li>
                      </ul>
                      <ul class="filter-items-container filter-items-clr-container-adv " id="scroll-bar" v-else>
                        <li v-for="(filterItem, index) in filter.filteredValues" :key="'filter-desktop' + index">
                          <fdk-link :link="filterItem.url">
                            <div class="filter-item-clr-adv">
                              <div class="filter-item-clr-i">
                                <div class="clr_box">
                                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="16" cy="16" r="16" :fill="'#' + filterItem.value" />
                                  </svg>
                                  <svg v-if="filterItem.is_selected" style="position: absolute;" width="14" height="11"
                                    viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 5L4.33333 9L13 1" stroke="#F9F7F4" stroke-width="2" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </fdk-link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="filter-disp" v-bind:class="{ open: !filter.isOpen }"
                    v-else-if="filter.key.kind == 'range' && filter.values.length > 0">
                    <fdk-slider>
                      <template slot-scope="sliderData">
                        <fy-slider-filter :filteritem="filter" :reset="resetSlider" :show-text-box="false"
                          @slider-query="sliderData.replaceQuery($event, filter)"></fy-slider-filter>
                      </template>
                    </fdk-slider>
                  </div>
                  <div class="filter-disp" v-bind:class="{ open: !filter.isOpen }"
                    v-else-if="filter.key.kind == 'singlevalued' && filter.values.length > 0">
                    <fdk-link :link="filter.values[0].url">
                      <div class="filter-item">
                        <div v-if="!filter.values[0].is_selected">
                          <!-- CheckBox Unchecked -->
                          <svg-wrapper :svg_src="'regular'" class="icon"></svg-wrapper>
                        </div>
                        <div v-if="filter.values[0].is_selected">
                          <!-- CheckBox Checked -->
                          <svg-wrapper class="icon" :svg_src="'check-box-selected'"></svg-wrapper>
                        </div>

                        <div class="filter-item-value regular-xxs font-body"
                          :class="{ active: filter.values[0].is_selected == true, }">
                          {{ filter.values[0].display }}
                        </div>
                        <div class="filter-item-count light-xxxs cl-DoveGray font-body">
                          ({{ filter.values[0].count }})
                        </div>
                      </div>
                    </fdk-link>
                  </div>
                </div>
              </div>
            </div>
            <div class="top_right_con">
              <sort-dd :filteredsorts="context.sort_on" :updateSelection="updateSelection" class="DSort" />
            </div>
          </div>
        </div>
      </div>
      <div class="content-container">
        <template>

          <div class="right">
            <div>
              <fdk-filter-modal>
                <template slot-scope="filterModalData">
                  <transition name="modal-filter" v-if="showFilterModal" @close="showFilterModal = !showFilterModal">
                    <div class="modal">
                      <div class="modal-container">
                        <div class="modal-header">
                          <span class="bold-xl font-header">FILTER</span>
                          <div v-on:click="closeModal($event, 'filter'); filterModalData.closeModal();">
                            <svg-wrapper :svg_src="'cross-black'"></svg-wrapper>
                          </div>
                        </div>
                        <div class="modal-content">
                          <div class="pane leftPane">
                            <ul>
                              <li class="title" v-for="(filteritem, idx) in filterModalData.filters"
                                :key="idx + '-mobile'"
                                v-on:click="filterModalData.updateSelectedItem(filteritem, idx); mobileSearchText = '';">
                                <svg-wrapper v-if="!filteritem.key.logo" :svg_src="'home'"></svg-wrapper>
                                <!-- <img class="filter-image" v-else :src="filteritem.key.logo" alt="logo" /> -->
                                <span class="modal-text">
                                  {{ filteritem.key.display }}
                                </span>
                              </li>
                            </ul>
                          </div>
                          <div class="pane rightPane">
                            <div class="filter-disp"
                              v-if="filterModalData.filters[filterModalData.selected_item].key.kind !== 'range'">
                              <ul
                                v-if="filterModalData.filters[filterModalData.selected_item].key.name !== 'primary_color'">
                                <li class="filterValue"
                                  v-for="(filterValue, index) in filterModalData.getFilteredResults(mobileSearchText)"
                                  :key="filterValue.value + index"
                                  v-on:click="filterModalData.updateFilter(filterValue, filterModalData.selected_item)">
                                  <div class="filter-item-i" v-if="!filterValue.is_selected">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                      xmlns="http://www.w3.org/2000/svg">
                                      <rect width="16" height="16" stroke-width="2" stroke="#26201A" />
                                    </svg>
                                  </div>
                                  <div v-if="filterValue.is_selected" class="filter-item-i filter-item-tab-i">
                                    <!-- CheckBox Checked -->
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                      xmlns="http://www.w3.org/2000/svg">
                                      <rect width="16" height="16" rx="2" fill="#26201A" />
                                      <path d="M4 8L6.5 11L13 5" stroke="#F9F7F4" />
                                    </svg>
                                  </div>
                                  <span class="regular-s">
                                    {{ filterValue.display }}
                                  </span>
                                </li>
                              </ul>
                              <ul v-else class="filter_cont_tab">
                                <li class="filterValue filterValueTab"
                                  v-for="(filterValue, index) in filterModalData.getFilteredResults(mobileSearchText)"
                                  :key="filterValue.value + index"
                                  v-on:click="filterModalData.updateFilter(filterValue, filterModalData.selected_item)">
                                  <div class="filter-item-clr-adv">
                                    <div class="filter-item-clr-i">
                                      <div class="clr_box">
                                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                                          xmlns="http://www.w3.org/2000/svg">
                                          <circle cx="16" cy="16" r="16" :fill="'#' + filterValue.value" />
                                        </svg>
                                        <svg v-if="filterValue.is_selected" style="position: absolute;" width="14"
                                          height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M1 5L4.33333 9L13 1" stroke="#F9F7F4" stroke-width="2" />
                                        </svg>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                            </div>

                            <div class="filter-disp" v-else>
                              <div class="slider">
                                <fy-slider-filter :filteritem="filterModalData.filters[filterModalData.selected_item]"
                                  :reset="resetSlider" :show-text-box="false"
                                  @slider-query="filterModalData.updateSliderInfo($event, filterModalData.filters[filterModalData.selected_item])">
                                </fy-slider-filter>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="modal-footer">
                          <div class="actionBtn"
                            @click="filterModalData.resetFilters(); resetSlider = !resetSlider; filterModalData.applyFilters(); showFilterModal = false;">
                            <span>CLEAR ALL</span>
                          </div>
                          <div class="actionBtn actionBtnOk"
                            @click="filterModalData.applyFilters(); closeModal($event, 'filter');">
                            <span>APPLY</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </transition>
                </template>
              </fdk-filter-modal>
            </div>
            <div>
              <fdk-filter-modal>
                <template slot-scope="filterModalData">
                  <transition name="modal-filter" v-if="showFilter480Modal"
                    @close="showFilter480Modal = !showFilter480Modal">
                    <div class="modal">
                      <div class="modal-container">
                        <div class="modal-header">
                          <span class="bold-xl font-header">FILTER</span>
                          <div v-on:click="closeModal($event, 'filter480'); filterModalData.closeModal();">
                            <svg-wrapper :svg_src="'cross-black'"></svg-wrapper>
                          </div>
                        </div>
                        <div class="modal480-content">
                          <div class="paneHead480">
                            <ul>
                              <li class="title480" v-for="(filteritem, idx) in filterModalData.filters"
                                :key="idx + '-mobile'">
                                <div class="modal-text modal-text-480"
                                  v-on:click="clickedFilter480(filterModalData, idx)">
                                  <div class="bold-lg active">
                                    {{ filteritem.key.display }}
                                  </div>
                                  <div v-bind:class="{ 'filter-arrow-up': !filteritem.isOpen, }">
                                    <!-- Arrow icon -->
                                    <svg-wrapper :svg_src="'arrow-dropdown-black'"></svg-wrapper>
                                  </div>
                                </div>

                                <div class="pane480 rightPane480">
                                  <div class="filter480-disp" v-bind:class="{ open: filteritem.isOpen }"
                                    v-if="filteritem.key.kind !== 'range'">
                                    <ul v-if="filteritem.key.name !== 'primary_color'">
                                      <li class="filterValue filter480value"
                                        v-for="(filterValue, index) in filteritem.values" :key="filterValue.value + index"
                                        v-on:click="filterModalData.updateFilter(filterValue, idx); mobileSearchText = '';">
                                        <div class="filter-item-i" v-if="!filterValue.is_selected">
                                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <rect width="16" height="16" stroke-width="2" stroke="#26201A" />
                                          </svg>
                                        </div>
                                        <div v-if="filterValue.is_selected" class="filter-item-i">
                                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <rect width="16" height="16" rx="2" fill="#26201A" />
                                            <path d="M4 8L6.5 11L13 5" stroke="#F9F7F4" />
                                          </svg>
                                        </div>
                                        <span class="regular-s"
                                          v-bind:class="{ 'bold-lg active': filterValue.is_selected, }">
                                          {{ filterValue.display }}
                                        </span>
                                      </li>
                                    </ul>
                                    <ul class="filter_cont_480" v-else>
                                      <li class="filterValue filterValuePhn"
                                        v-for="(filterValue, index) in filteritem.values" :key="filterValue.value + index"
                                        v-on:click="filterModalData.updateFilter(filterValue, idx); mobileSearchText = '';">
                                        <div class="filter-item-clr-adv">
                                          <div class="filter-item-clr-i">
                                            <div class="clr_box">
                                              <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="16" cy="16" r="16" :fill="'#' + filterValue.value" />
                                              </svg>
                                              <svg v-if="filterValue.is_selected" style="position: absolute;" width="14"
                                                height="11" viewBox="0 0 14 11" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1 5L4.33333 9L13 1" stroke="#F9F7F4" stroke-width="2" />
                                              </svg>
                                            </div>
                                          </div>
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                                  <div class="filter-disp" v-else>
                                    <div class="slider">
                                      <fy-slider-filter :filteritem="filteritem" :reset="resetSlider"
                                        :show-text-box="false"
                                        @slider-query="filterModalData.updateSliderInfo($event, filteritem)">
                                      </fy-slider-filter>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div class="modal-footer">
                          <div class="actionBtn"
                            @click="filterModalData.resetFilters(); resetSlider = !resetSlider; filterModalData.applyFilters(); showFilter480Modal = false;">
                            <span>DISCARD</span>
                          </div>
                          <div class="actionBtn actionBtnOk"
                            @click="filterModalData.applyFilters(); closeModal($event, 'filter480');">
                            <span>APPLY</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </transition>
                </template>
              </fdk-filter-modal>
            </div>

            <!-- <fdk-infinite-loading class="plp-container">
                    <template slot-scope="infiniteLoaderData">
                      <div class="product-container">
                        <div v-for="(product, index) in getProducts" :key="index + '-product.uid'">
                          <div @click="redirectToProduct(product.url)" class="product-wrapper">
                            {{ product }}
                            <fy-product-card :product="product" :context="context" :active-product-id="active_product_uid"
                              @slide-up="slideUpEventListener($event)" @slide-down="slideDownEventListener($event)"
                              :global_config="global_config" :listing_price_config="listingPriceConfig"></fy-product-card>
                          </div>
                        </div>
                        <fdk-loader id="loader" class="loader-center" v-if="infiniteLoaderData.hasNext"></fdk-loader>
                      </div>
                    </template>
                  </fdk-infinite-loading> -->


            <div class="infineOn xyz">
              <div class="filter-pill-container" v-show="getSelectedFilters.length">
                <div class="selected-filter-pill-container">
                  <div class="selected-filter-pill font-body" v-for="(selectedFilter, index) in getSelectedFilters"
                    :key="index">
                    <span>{{ selectedFilter.display }}</span>
                    <fdk-link :link="selectedFilter.url">
                      <img src="../../assets/images/close-icon.png" class="cancel-pill" />
                    </fdk-link>
                  </div>
                </div>

                <fdk-link :link="$route.path">
                  <span class="clear-filter-btn clear-filter-style" @click="showFilter = false">CLEAR ALL</span>
                </fdk-link>
              </div>

              <div v-if="getPageConfigById('InfScroll')">

                <fdk-infinite-loading class="plp-container" style="padding-bottom: 48px;">
                  <div class="product-container">
                    <div class="plpFadeIn" v-for="(product, index) in filterProducts8" :key="index + '-product.uid'" :style="`animation-delay: ${200 * index}ms;`">
                      <div @click="redirectToProduct(product.url)" class="product-wrapper">
                        <fy-product-card :product="product" :context="context" :showWishlist="true"
                          :active-product-id="active_product_uid" @slide-up="slideUpEventListener($event)"
                          @slide-down="slideDownEventListener($event)" :global_config="global_config"
                          :listing_price_config="listingPriceConfig"
                          :showTags="page_config.props.showTags"></fy-product-card>
                      </div>
                    </div>
                  </div>
                </fdk-infinite-loading>

                <banner-db :bnr_img1="getPageConfigById('image1')" :bnr_img2="getPageConfigById('image2')"
                  :bnr_head="getPageConfigById('bHead')" :bnr_subhead="getPageConfigById('bSubHead')"
                  :btn_txt="getPageConfigById('button_text')" :btn_link="getPageConfigById('button_link')" />

                <fdk-infinite-loading class="plp-container" style="padding-top: 48px;">
                  <div class="product-container">
                    <div v-for="(product, index) in filterProducts8plus" :key="index + '-product.uid'">
                      <div @click="redirectToProduct(product.url)" class="product-wrapper">
                        <fy-product-card :product="product" :showWishlist="true" :context="context"
                          :active-product-id="active_product_uid" @slide-up="slideUpEventListener($event)"
                          @slide-down="slideDownEventListener($event)" :global_config="global_config"
                          :listing_price_config="listingPriceConfig"
                          :showTags="page_config.props.showTags"></fy-product-card>
                      </div>
                    </div>
                  </div>
                </fdk-infinite-loading>


              </div>
              <div v-else-if="!getPageConfigById('InfScroll')">
                <fdk-products class="plp-container">
                  <template slot-scope="{fetchproducts}">
                    <div class="product-container" style="padding-bottom: 48px;">
                      <div class="plpFadeIn" v-for="(product, index) in getProducts.slice(0, pageSize / 2)" :key="index + '-product.uid'" :style="`animation-delay: ${200 * index}ms;`">
                        <div @click="redirectToProduct(product.url)" class="product-wrapper">
                          <fy-product-card :product="product" :showWishlist="true" :context="context"
                            :active-product-id="active_product_uid" @slide-up="slideUpEventListener($event)"
                            @slide-down="slideDownEventListener($event)" :global_config="global_config"
                            :listing_price_config="listingPriceConfig"
                            :showTags="page_config.props.showTags"></fy-product-card>
                        </div>
                      </div>
                    </div>
                    <banner-db :bnr_img1="getPageConfigById('image1')" :bnr_img2="getPageConfigById('image2')"
                      :bnr_head="getPageConfigById('bHead')" :bnr_subhead="getPageConfigById('bSubHead')"
                      :btn_txt="getPageConfigById('button_text')" :btn_link="getPageConfigById('button_link')" />
                    <div class="product-container" style="padding-top: 48px;">
                      <div v-for="(product, index) in getProducts.slice(pageSize / 2)" :key="index + '-product.uid'">
                        <div @click="redirectToProduct(product.url)" class="product-wrapper">
                          <fy-product-card :product="product" :showWishlist="true" :context="context"
                            :active-product-id="active_product_uid" @slide-up="slideUpEventListener($event)"
                            @slide-down="slideDownEventListener($event)" :global_config="global_config"
                            :listing_price_config="listingPriceConfig"
                            :showTags="page_config.props.showTags"></fy-product-card>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="paginationBar">
                        <button class="pageArwBtn"
                          @click="fetchproducts({ pageNo: context.page.current - 1, pageSize: pageSize })"
                          v-if="context.page.has_previous">
                          <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.70117 1.51367L1.75523 8.00016L7.70117 14.4866" stroke="#26201A"
                              stroke-width="2" />
                          </svg>
                        </button>

                        <fdk-link 
                          class="pageBtn font-body"
                          :class="{'active': context.page.current === index - 1 + getPaginationStartIndex}"
                          v-for="index in displayPageCount" 
                          :key="index" 
                          @click.native.prevent="fetchproducts({ pageNo: index - 1 + getPaginationStartIndex, pageSize: pageSize })"
                          :link="getPageURL({ pageNo: index - 1 + getPaginationStartIndex, pageSize: pageSize })"
                        >
                          {{ index - 1 + getPaginationStartIndex }}
                        </fdk-link>

                        <button v-if="context.page.has_next" class="pageArwBtn"
                          @click="fetchproducts({ pageNo: context.page.current + 1, pageSize: pageSize })">
                          <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.29883 1.51367L7.24477 8.00016L1.29883 14.4866" stroke="#26201A"
                              stroke-width="2" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </template> 
                </fdk-products>
              </div>
            </div>


          </div>
        </template>
      </div>
      <transition name="modal-sort" v-if="showSortByModal">
        <div class="modal">
          <div class="modal-container">
            <div class="modal-header">
              <span class="bold-xl font-header">Sort</span>
              <div v-on:click="closeModal($event, 'sort')">
                <svg-wrapper :svg_src="'cross-black'"></svg-wrapper>
              </div>
            </div>
            <div class="modal-content">
              <ul style="width: 100%">
                <li v-for="(sortitem, index) in context.sort_on" :key="index + '-sort'"
                  v-bind:class="{ 'bold-lg active': getSortOnValue == sortitem.value, }"
                  v-on:click="closeModal($event, 'sort')">
                  <fdk-link :link="sortitem.url" class="filterValue sort-item">
                    <sp an class="sort-arrow">
                      <svg-wrapper :svg_src="'radio-selected'" v-if="getSortOnValue == sortitem.value"></svg-wrapper>
                      <svg-wrapper v-else :svg_src="'regular'"></svg-wrapper>
                    </sp>
                    {{ sortitem.display }}
                  </fdk-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </transition>
      <!-- FILTER MODAL -->
      <div class="mobile share-wrap">
        <transition name="fade" :data-ss="String(showShare)" :data-ismobile="String(isMobile)">
          <share
            :title="`Spread the shopping delight! Scan QR & share this products with
                                                                                                                                                                                                                                                                    your loved ones`"
            :shareLoading="shareLoading" :qr_code="qr_code" @close-share="showShare = false" v-if="showShare && isMobile"
            :share_link="share_link" v-click-outside="hideShare" :key="'mobile-share'" />
        </transition>
      </div>
      <back-to-top-db v-if="page_config.props.back2top" />
    </template>
  </div>
</template>

<settings>
  {
    "props": [
      {
        "type": "checkbox",
        "id": "pCount",
        "label": "Show product count",
        "default": true,
        "info": "Check to "
      },
      {
        "type": "checkbox",
        "id": "InfScroll",
        "label": "Enable infinity scroll",
        "default": true,
        "info": "Check to "
      },
      {
        "type": "checkbox",
        "id": "back2top",
        "label": "Back to top button",
        "default": true,
        "info": "Check to "
      },
      {
        "type": "checkbox",
        "id": "showTags",
        "label": "Enable tags & Badge",
        "default": true,
        "info": "Check to enable tags and badges"
      },
      {
              "type": "image_picker",
              "id": "image1",
              "default": "",
              "label": "Image 1",
              "info": "Pls attach Image"
      },
      {
              "type": "image_picker",
              "id": "image2",
              "default": "",
              "label": "Image 2",
              "info": "Pls attach Image"
      },
      {
              "type": "text",
              "id": "bHead",
              "default": "Explore Our Outfits",
              "label": "Banner Heading"
      },
      {
              "type": "text",
              "id": "bSubHead",
              "default": "Curated list of our best outfit combinations designed by Vastrakala experts",
              "label": "Banner Subheading"
      },
      {
              "type": "text",
              "id": "button_text",
              "default": "Read article",
              "label": "Button Text"
        },
        {
              "type": "url",
              "id": "button_link",
              "default": "",
              "label": "Button Redirect Link"
        }
    ]
  }
  </settings>
  

<script>
import fyproductcard from "./../../global/components/fy-product-card.vue";
import fyselect from "./../../global/components/fy-select.vue";
import fynotfound from "./../../global/components/fy-not-found.vue";
import sliderfilter from "./../../global/components/fy-slider-filter.vue";
import share from "./../../global/components/share.vue";
import { detectMobileWidth, detect480Width } from "./../../helper/utils";
import { isBrowser, isNode } from "browser-or-node";
import sortDD from "./../../global/components/plp/sort-dd";
import SvgWrapper from "./../../components/common/svg-wrapper.vue";
import bannerDB from "./../../global/components/plp/banner-db";
import backToTopDB from "./../../global/components/plp/back-to-top-db";
import plpLoader from "./../../global/components/common/loading.vue"

export default {
  name: "fdk-plp",
  components: {
    "fy-product-card": fyproductcard,
    "fy-select": fyselect,
    "fy-not-found": fynotfound,
    "fy-slider-filter": sliderfilter,
    "sort-dd": sortDD,
    share,
    "svg-wrapper": SvgWrapper,
    "banner-db": bannerDB,
    "back-to-top-db": backToTopDB,
    "plp-loader": plpLoader,

  },
  props: {
    context: {},
  },

  watch: {
    context: {
      handler() {
        if (
          this.context.filters &&
          this.context.filters.length > this.viewMore.length
        ) {
          for (var i = 0; i < this.context.filters.length; i++) {
            if (!this.viewMore[i]) {
              this.$set(this.viewMore, i, false);
            }
          }
        }
      },
      deep: true
    },

    active_product_uid: function () {
      this.context.item.map((item) => {
        if (item.uid === this.active_product_uid) {
          item.is_active = true;
        } else {
          item.is_active = false;
        }
      });
    },
  },
  data: function data() {
    return {
      shareLoading: false,
      showShare: false,
      share_link: "",
      qr_code: "",
      active_product_uid: 0,
      mobileSearchText: "",
      selectedSortOpt: "",
      storeName: "",
      SHOW_SEARCH_THRESHOLD: 8,
      placeholder: "Search ",
      showFilterModal: false,
      showSortByModal: false,
      filteredItems: [],
      selectedFilters: [],
      searchTextObj: {},
      resetSlider: false,
      viewMore: [],
      products: [
        {
          isImageLoading: true,
        },
      ],
      isMobile: false,
      showFilter: false,
      isMyMobile: false,
      showFilter480Modal: false,
      displayPage: 1,
      pageSize: 16,
    };
  },
  mounted() {
    this.isMobile = detectMobileWidth();
    this.is480width = detect480Width();
    if(!this.getPageConfigById('InfScroll')){
      if (
          this.$router.currentRoute.query.page_no &&
          this.$router.currentRoute.query.page_size
      ) {
          this.$router.push({
              path: this.$route.fullPath
          });
      } else {
          this.$router.push({
              path: this.$route.fullPath,
              query: {
                  page_no: 1,
                  page_size: this.pageSize,
              },
          });
      }
    }

  },
  methods: {
    getPageURL({ pageNo, pageSize }){
      return `${this.$route.path}?page_no=${pageNo}&page_size=${pageSize}`;
    },
    shadeVariants() {
      return this.product.variants?.find?.(
        (variant) => variant.display_type === "color"
      );
    },
    closeMyOption(event) {
      for (let i = 0; i < this.getFilters.length; i++) {
        this.getFilters[i].isOpen = true;
      }
    },
    getPageConfigById(id) {
      return this.page_config?.props?.[id] || "";
    },
    clickedFilter(idx) {
      for (let i = 0; i < this.getFilters.length; i++) {
        if (idx == i) {
          this.getFilters[i].isOpen = !this.getFilters[i].isOpen;
        }
        else {
          this.getFilters[i].isOpen = true;
        }
      }
    },
    clickedFilter480(filterModalData, idx) {
      filterModalData.filters[idx].isOpen = !filterModalData.filters[idx].isOpen;

    },
    toggleFilter() {
      this.showFilter = !this.showFilter;
    },
    hideShare() {
      this.showShare = false;
    },
    redirectToProduct: function redirectToProduct(productUrl) {
      if (this.isLoadedInIframe()) {
        this.$router.push(productUrl);
        return;
      }
      if (!this.isMobile) {
        let routeData = this.$router.resolve(productUrl);
        window.open(routeData.href, "_blank");
      } else {
        this.$router.push(productUrl);
      }
    },
    getShareLink(share) {
      this.shareLoading = true;
      this.showShare = true;
      share.getShareLink(window.location.href).then((res) => {
        share.generateQRCode(res).then((data) => {
          this.qr_code = `
                <div style="width: 250px;">
                  ${data.svg}
                </div>
                `;
          this.share_link = res;
          this.shareLoading = false;
        });
      });
    },
    slideUpEventListener(id) {
      this.active_product_uid = id;
    },
    slideDownEventListener() {
      this.active_product_uid = 0;
    },
    resetFilters(modalReset) {
      if (this.$refs && this.$refs.mobileActionContainer) {
        modalReset();
      }
      this.$router.push({ query: {} });
    },
    selectedOptions: function (context) {
      let { filters } = context;
      filters = filters || [];
      let filterOptionsArray = filters.reduce((a, f, index) => {
        let { values, key } = f;
        values = values || [];
        let selectedValues = values
          .map((v) => {
            if (v.is_selected) {
              v.filterIndex = index;
              return v;
            }
          })
          .filter((v) => v);
        return [...a, ...selectedValues];
      }, []);
      this.activeFilters = filterOptionsArray;
      return filterOptionsArray;
    },
    updateSelectedOptions(item, modalUpdate) {
      if (this.$refs && this.$refs.mobileActionContainer) {
        modalUpdate(item, item.filterIndex);
      }
      if (item.url) {
        this.$router.push(item.url);
      } else {
        this.getRangeURL(item);
      }
    },
    getRangeURL(item) {
      let key = this.context.filters[item.filterIndex].key.name;
      let q = { ...this.$route.query };
      if (Object.keys(q).includes(key)) {
        delete q[key];
      }
      this.$router.push({ ...this.$route, query: q });
    },

    getFilterDisplay: function getFilterDisplay(filters, filterObj) {
      let filter = filters[filterObj.filterIndex];
      if (filter.key.kind === "range") {
        if (filterObj.currency_code) {
          return (
            "₹ " + filterObj.selected_min + " - ₹ " + filterObj.selected_max
          );
        } else {
          return filterObj.selected_min + "% - " + filterObj.selected_max + "%";
        }
      }
      return filterObj.display.toUpperCase();
    },
    changeViewMore(idx) {
      this.viewMore[idx] = !this.viewMore[idx];
      this.$forceUpdate();
    },
    kFormatter: function kFormatter(num) {
      return Math.abs(num) > 999
        ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(2) + "k"
        : Math.sign(num) * Math.abs(num);
    },
    updateSelection: function updateSelection(val) {
      const sortItemIndex = this.context.sort_on.findIndex(
        (item) => item.value === val
      );
      this.$router.push(this.context.sort_on[sortItemIndex].url);
    },
    closeModal: function closeModal(event, type) {
      if (type === "sort") {
        this.showSortByModal = false;
      } else if (type === "filter") {
        this.showFilterModal = false;
      } else if (type === "filter480") {
        this.showFilter480Modal = false;
      }
    },
    viewModal: function viewModal(event, type) {
      if (type === "sort") {
        this.showSortByModal = true;
      } else if (type === "filter") {
        this.showFilterModal = true;
      } else if (type === "filter480") {
        this.showFilter480Modal = true;
      }
    },

    filterResults: function filterResults(filter, index) {
      this.getFilters[index].filteredValues = filter.values.filter((item) => {
        if (filter.searchText.length > 0) {
          this.searchTextObj[this.getFilters[index].key.name] =
            filter.searchText;
          return (
            item.display
              .toLowerCase()
              .indexOf(filter.searchText.toLowerCase()) !== -1
          );
        } else {
          return item;
        }
      });
      this.$forceUpdate();
    },
    loadImage: function loadImage(id) {
      const placeHolder = this.$refs[`placeholder-${id}`];
      placeHolder[0].style.display = "none";
    },
    isLoadedInIframe() {
      if (isBrowser && window.location !== window.parent.location) {
        return true;
      } else {
        return false;
      }
    },
  },

  computed: {
    getPaginationStartIndex() {
      if (this.context.page.total > this.context.page.current + 3) {
        return this.context.page.current
      }
      else {
        return this.context.page.total - 3 < 1 ? 1 : this.context.page.total - 3
      }
    },
    getFilters: function getFilters() {
      this.filteredItems = [];
      const data =
        this.context.filters &&
        this.context.filters.map((item) => {
          item.searchText =
            this.searchTextObj[item] && this.searchTextObj[item.key]
              ? this.searchTextObj[item.key.name]
              : "";
          item.filteredValues = item.values;
          this.filteredItems.push(item);

          return item;
        });
      return this.filteredItems;
    },
    getSortOnValue: function getSortOnValue() {
      let val = "";
      let item = [];
      if (this.context && this.context.sort_on) {
        item = this.context.sort_on.filter((item) => item.is_selected);
      }
      return item.length > 0 ? item[0].value : "popular";
    },
    // getSelectedFilters: function getSelectedFilters() {
    //   this.selectedFilters = this.getFilters.filter((item) => {
    //     return item.is_selected;
    //   });
    // },
    getSelectedFilters() {
      let selectedFilters = [];

      this.getFilters.forEach((item) => {
        selectedFilters = [...selectedFilters, ...item.filteredValues];
      });

      return selectedFilters.filter((item) => item.is_selected);
    },
    getProducts: function getProducts() {
      return this.context.items.map((item) => {
        item.is_active = false;
        return item;
      });
    },
    hrefTarget() {
      return detectMobileWidth() ? "_self" : "_blank";
    },
    listingPriceConfig() {
      return this.context.app_features?.feature?.common?.listing_price?.value;
    },
    filterProducts8: function () {
      return this.getProducts.filter((item, index) => index < 8)
    },
    filterProducts8plus: function () {
      return this.getProducts.filter((item, index) => index >= 8)
    },
    displayPageCount: function () {
      if (this.context.page.total < 5) {
        return this.context.page.total;
      }
      else {
        return 4;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.plp-container {
  @media @tablet {
    margin: 20px 0 0 0;
  }

  /deep/.list-items {
    background: none;
  }

  /deep/.loading {
    display: none;
  }
}

.share-wrap {
  /deep/ .share-popup {
    @media @tablet {
      top: 40px;
    }

    @media @mobile {
      top: 0;
    }
  }

  // @media mobile {
  //   display:none;
  // }
}


// .DSort{
//   /deep/.items{
//     margin: unset;
//     padding: unset;
//   }
// }

.share-button {
  margin-left: 10px;
  cursor: pointer;
  top: 7px;
  position: absolute;

  .share-img {
    position: relative;
    margin: 0;
  }
}

.share-mobile-button {
  cursor: pointer;
  display: flex;
  position: absolute;
  cursor: pointer;

  .share-mobile-img {
    position: relative;
    margin: 0;
  }
}

.content-container {
  display: flex;
  flex-direction: column;
  background: @PageBackground;
  // margin-top: 15px;
  min-height: 80vh;

  @media @mobile {
    // margin: 10px 5px;
  }
}

.filterValue img,
.filter-item img {
  padding-right: 5px;
}

.desktop-header {
  padding: 0;
  display: flex;
  // line-height: 35px;
  align-items: center;
  background: none;

  margin-top: 12px;
  margin-bottom: 24px;
}

.cover .meta-desc {
  width: 130px;
}

.modal480-content {
  overflow: auto;
  height: 100%;
  padding-left: 16px;
  padding-right: 16px;
}

.title {
  width: 18%;
  text-transform: uppercase;
  line-height: 35px;
  margin: 0;
}

.title480 {
  border-bottom: 1px solid #ECE5DC;
  padding-bottom: 16px;
  padding-top: 16px;
  // margin-left: 16px;
  // margin-right: 16px;
}

.seperator {
  padding: 0 20px 0 24px;
  font-size: 21px;
  color: #41434c;
  opacity: 0.16;
}

.brand-name {
  text-transform: capitalize;
}

.sort {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-left: auto;
  padding: 0 34px 0 0;
}

.sort-arrow {
  transform: rotate(-90deg);
}

.wide {
  width: 300px;
  min-height: 35px;
  margin-left: 0.3125rem;
  border: 0;
}

.store-name {
  font-weight: 900;
  margin-left: 0.5em;
}

.right {
  // margin: 1%;
  width: 100%;

  .collection-desc {
    margin: 1rem auto;
  }
}

.left {
  display: flex;
  // border-right: 1px solid #e4e5e6;
  // margin-bottom: 2em;
  // background-color: #ffffff;
}

.product-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 1fr;
  grid-template-rows: 1fr;
  grid-gap: 2em;

  // @media screen and (max-width: 1024px) {
  //   grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));
  // }

  /deep/ .imgClass {
    height: 100%;

    .fy__img {
      // object-fit: contain;
      object-fit: unset; //dipanshu
    }
  }
}

// .product-wrapper {
//   border: 1px solid #e4e5e6;
//   border-radius: 3px;
//   box-sizing: border-box;
//   height: 100%;
// }

.mobile-header {
  display: none;

  //padding-bottom: 25px;
  .m-header {
    display: flex;
    flex-direction: column;
    background: @PageBackground;
    justify-content: center;
    align-items: center;
    width: 100%;
    line-height: 2em;
    position: relative;
    z-index: 2;
    top: 0x;
    // border-top: 1px solid #f8f8f8;
  }

  .m-title {
    background: #f1f0ee;
    width: 100%;
    line-height: 20px;
  }

  .m-title>div {
    padding: 10px;
  }

  .text-seperator {
    padding: 0 5px;
  }

  .m-action-container {
    // margin-top:20px;
    width: 100%;
    display: flex;
    flex-direction: row;
    // border-bottom: 1px solid #e6e6e6; // disable for desktop
    text-align: center;
    color: #41434c;
    padding: 5px;
    user-select: none;
  }

  .m-action-child-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border: groove #41434c 1px;

    /deep/ .share-popup {
      .close {
        top: 70px;
      }
    }
  }
}

.desktop-header {
  display: block;

  .header {
    display: flex;
    // flex-direction: column;
    background: @PageBackground;
    // justify-content: center;
    // align-items: center;
    width: 100%;
    // line-height: 2em;
    // border-top: 1px solid #f8f8f8;
  }

  .m-title {
    background: #f1f0ee;
    width: 100%;
    line-height: 20px;
  }

  .m-title>div {
    padding: 10px;
  }

  .text-seperator {
    padding: 0 5px;
  }

  .m-action-container {
    // margin-top: 20px;
    width: 100%;
    display: flex;
    flex-direction: row;
    // border-bottom: 1px solid #e6e6e6;
    // text-align: center;
    color: #41434c;
    // padding: 5px 0;
    user-select: none;
    justify-content: space-between;
  }

  .m-action-child-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    /deep/ .share-popup {
      .close {
        top: 70px;
      }
    }
  }
}

.cl-DoveGray {
  color: #41434c;
}

.m-filter-container {
  width: 100%;
}

.line {
  height: 30px;
  line-height: 30px;
  color: #e6e6e6;
  top: 2px;
  font-size: 25px;
}

.filter-list {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  // width: 262px;
  /*background: white;*/
  // padding: 5px 10px;
  padding-right: 43px;
  min-height: auto;

}

.filter-item-value {
  text-transform: capitalize;
  font-size: 13px;
}

.filter-title {
  text-transform: uppercase;
  display: flex;
  flex-direction: row;
  // justify-content: space-between;
  align-items: center;
  // padding: 8px 0;
  cursor: pointer;
}

// .fil_tit {
// font-weight:bold !important;
// font-size:13px !important;
// }

.filter-arrow-up {
  transform: rotate(180deg);
}

.filter-item {
  display: flex;
  flex-direction: row;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 0 8px;
  align-items: center;
  // min-height: 1.5rem; // removed for desktop-f
  cursor: pointer;
  color: #41434c;
  // border-bottom: 1px solid #f5f5f5;
}

.filter-item-adv {
  padding: unset;
  padding-left: 24px;
  padding-bottom: 12px;

}

.filter-item-clr-adv {
  display: flex;
  flex-direction: row;
  overflow: hidden;
  // white-space: nowrap;
  text-overflow: ellipsis;
  // padding: 0 8px;
  align-items: center;
  // min-height: 1.5rem;
  cursor: pointer;
}


.slider {
  padding: 20px;
}

.open {
  display: none;
}

.filter-search input {
  border: none;
  // background: #f5f5f5;
  outline: 0;
  padding: 7px 0 7px 5px;
  // border-radius: 5px 0 0 5px;
  width: 85%;
}

.search-icon {
  margin: auto;
}

.filter-search {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 10px 0;
  border: 1px solid #e4e5e6;
  // border-radius: 5px;
  cursor: pointer;
}

.filter-item-count {
  margin-left: auto;
}

.product-card {
  width: 100%;
  position: relative;
  border-radius: 5%;
}

.text-seperator {
  padding: 0 5px;
}

.modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  overflow: hidden;
  background-color: @PageBackground;
  transition: all 0.25s ease;
  user-select: none;
}

.modal-container {
  height: 100vh;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 32px;

  @media screen and (max-width: 480px) {
    padding: 14px 16px;
  }
}

.modal-content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

// .modal-480content {
//   display: flex;
//   flex-direction: column;
//   flex-wrap: wrap;
// }

.pane {
  height: 80vh;
  // overflow: auto;
}

.pane ul {
  padding-bottom: 30px;
  height: 75vh;
  overflow: auto;
  // margin-right: 40%; // only for show scroll effect on tab
  margin-right: unset; // only for show scroll effect on tab
}

.leftPane {
  flex: 0.6;
  // border-right: 1px solid #e6e6e6;
  margin-left: 32px;
  // background: rgba(241, 235, 229, 1);
  background-color: @ThemeAccentL2;
}

.leftPane .title {
  display: flex;
  flex-direction: column;
  // align-items: center;
  align-items: flex-start;
  // padding: 12px 0;
  cursor: pointer;
  width: unset;
  padding-left: 20px;
}

.leftPane .title:hover {
  // background-color: #e6e6e6;
  background: @ThemeAccentD1;

}

.inline-svg {
  margin-bottom: 0px;
  margin-right: 4px;
}

.rightPane {
  flex: 1.2;
}

.rightPane>.filter-disp>ul {
  margin-right: 40%; // only for show scroll effect on tab

}

.filterValue {
  // padding: 15px 10px;
  // border-bottom: 1px solid #e6e6e6;
  display: flex;
  align-items: center;
  padding-top: 6px;
  padding-bottom: 6px;
  padding-left: 24px; //set for tab

  @media screen and (max-width: 480px) {
    padding: unset;
    padding-top: 12px;
    padding-left: 0px;
  }
}

.filterValue:hover {
  background-color: #e6e6e6;
}

// .sort-item {
// justify-content: space-between;
// }

.count {
  color: gray;
  margin-left: auto;
}

.filter-search-mobile {
  margin: 0 10px;
  padding: 5px;
  // border-radius: 10px;
  border: 1px solid gray;
  position: relative;
  height: 24px;
}

.filter-search-mobile input {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  border: none;
  text-indent: 10px;
  width: 85%;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

.modal-footer {
  position: fixed;
  bottom: 5%;
  left: 0;
  right: 0;
  background: @PageBackground;
  text-align: center;
  // border-top: 1px solid #e6e6e6;
  z-index: 1;
  display: flex;
  justify-content: space-evenly;
}

.actionBtn {
  width: 44%;
  display: inline-block;
  padding: 15px 10px;
  border: 1px solid rgba(38, 32, 26, 1);
  color: @ButtonPrimary;
  background-color: @ButtonSecondary;
}

.actionBtnOk {
  color: @ButtonSecondary;
  background-color:@ButtonPrimary;

}

// .actionBtn:nth-child(1) {
//   border-right: 1px solid #e6e6e6;
// }

.modal-text {
  text-transform: capitalize;
  text-align: center;
}

.modal-text-480 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  // padding: 0px 16px;
}

.rating {
  unicode-bidi: bidi-override;
  color: #c5c5c5;
  font-size: 20px;
  height: 20px;
  width: 110px;
  position: relative;
  padding: 0;
  text-shadow: 0px 1px 0 #a2a2a2;
  white-space: nowrap;
}

.bottom-layer {
  padding: 0;
  display: block;
  z-index: 0;
}

.top-layer {
  color: #e7711b;
  padding: 0;
  position: absolute;
  z-index: 1;
  display: block;
  top: 0;
  left: 0;
  overflow: hidden;
  height: inherit;
}



.bold-lg {
  font-weight: 600; //figma
  font-size: unset;
}

.filter-disp {
  // applied by dipanshu
  position: absolute;
  z-index: 5;
  background-color: transparent;
}

.filter-disp-adv {
  // overflow: auto;
  //display: flex;
  // left: 0;
  // width: 101%;
  width: 209px;
  // background: rgba(245, 242, 236, 1);
  background: @Overlay;
  margin-top: 8px;
  border-radius: 8px;
}

.example-adv {
  display: flex;
  max-height: 580px;
  overflow: auto;
  margin-top: 16px; //DF
  margin-right: 6px; //DF
  margin-bottom: 4px; //DF
}

.example-clr-adv {
  margin: unset;
}

.filter-items-container-adv {
  display: flex;
  flex-direction: column;
  // flex-wrap: wrap;
  // max-height: 204px;
}

.filter-items-clr-container-adv {
  display: flex;
  flex-direction: row;
  gap: 11px; //should be 12px
  flex-flow: wrap;
  padding: 24px 20px;
  // justify-content: center;
}

.rightPane>.filter-disp {
  width: 100%;
  // padding-left: 24px;
}

.my__checkbox {
  align-items: center;
  border: 1px solid #000;
  display: flex;
  height: 12px;
  justify-content: center;
  transition: all .1s cubic-bezier(0, 0, .58, 1);
  width: 12px;
}

.icon__filled {
  background-color: #000;
}


.clr_box {
  align-items: center;
  border: 1px solid #000;
  display: flex;
  justify-content: center;
  transition: all 0.1s cubic-bezier(0, 0, 0.58, 1);
  border-radius: 50%;
}


.icon__check {
  fill: white;
  transition: fill .1s cubic-bezier(0, 0, .58, 1);
}

.filter-item-i {
  padding-right: 8px; //desktop-f
}


// .filter-item-tab-i {
//   padding-left: 24px;
// }

/deep/ .loader-center {
  grid-column-start: -1;
  grid-column-end: 1;

  .container {
    background-color: transparent;
  }
}

@media screen and (max-width: 1024px) {}

@media screen and (max-width: 780px) {
  .product-image {
    width: 100%;
  }

  .header {
    display: none;
  }

  .mobile-header {
    display: block;
    position: sticky;
    // top: 66px;
    z-index: 3;
  }

  .desktop-header {
    display: none;
  }

  .left {
    display: none;
  }

  .right {
    width: 100%;
    // margin: 0 15px;
  }

  .product-container {
    grid-template-columns: repeat(auto-fill, minmax(40%, 1fr));
    grid-gap: 0.5em;
  }

  .cl-Profit {
    color: #41434c;
  }

  .header {
    display: none;
  }

  .inline-svg {
    margin-bottom: 0;
  }
}

@media screen and (min-width: 320px) {
  .actionBtn {
    width: 40%;
  }
}

// .shine {
//   border: 2px solid #dbd9d92a;
//   border-radius: 2%;
//   background: #f6f7f8;
//   background-image: linear-gradient(
//     to right,
//     #f6f7f8 0%,
//     #e8e9eb 20%,
//     #f6f7f8 40%,
//     #f6f7f8 100%
//   );
//   background-repeat: no-repeat;
//   background-size: 100% 100%;
//   display: inline-block;
//   position: relative;

//   -webkit-animation-duration: 1s;
//   -webkit-animation-fill-mode: forwards;
//   -webkit-animation-iteration-count: infinite;
//   -webkit-animation-name: placeholderShimmer;
//   -webkit-animation-timing-function: linear;
// }

// @-webkit-keyframes placeholderShimmer {
//   0% {
//     background-position: -468px 0;
//   }

//   100% {
//     background-position: 468px 0;
//   }
// }
.view-more {
  font-size: 14px;
  display: flex;
  justify-content: center;
  margin-top: 5%;
  color: @ButtonPrimary;
  cursor: pointer;
}

.active-filters-container {
  font-size: 12px;
  display: flex;
  flex-wrap: wrap;
  padding: 0px 0 10px 0;
  margin: 0 0px 18px 0px;

  /*border-bottom: 1px solid #e4e5e6;*/
  @media @mobile {
    margin: 0;
    padding: 10px;
  }

  .selected-item {
    transition: all 0.1s ease-in;
    height: 1.5em;
    background: #e4e4e4;
    border-radius: 4px;
    border: 1px solid #bdbdbd;
    padding: 7px 9px;
    margin: 0 12px 12px 0;
    display: flex;
    align-items: center;
    color: #41434c;
    cursor: pointer;

    &:hover {
      background: #41434c;
      color: white;

      .close-icon {
        background-image: url("../../assets/images/close-icon.png");
      }
    }

    .close-icon {
      background-image: url("../../assets/images/close-icon.png");
      width: 9px;
      height: 9px;
      display: inline-block;
      background-size: cover;
    }
  }
}

.filter-image {
  width: 35px;
}

.product-count {
  font-size: 18px;
  font-weight: 700;
}

.dark-sm {
  font-size: 12px;
}

.filter-pill-container {
  display: flex;
  align-items: center;
  // justify-content: space-between;
  // margin: 20px 0;
  margin-bottom: 16px;
  gap: 24px;
  // border-bottom: 2px solid #b5cec9;
}

.selected-filter-pill-container {
  display: flex;
  flex-wrap: wrap;
}

.selected-filter-pill {
  transition: all 0.1s ease-in;
  font-family: "FuturaPT-Book", Arial, sans-serif;
  // text-transform: lowercase;
  padding: 7px 9px;
  margin-right: 8px;
  display: flex;
  align-items: center;
  // background-color: rgba(241, 235, 229, 1);
  background-color: @ThemeAccentL2;

  color: @TextBody;
  cursor: pointer;
  gap: 5px;
}

.cancel-pill {
  height: 12px;
  display: block;
}

/* width */
::-webkit-scrollbar {
  width: 4px;
}

/* Track */
::-webkit-scrollbar-track {
  background: transparent;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: @ThemeAccentD1;

}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.plp_heading {
  //styleName: desktop/H2 - 32px Marcellus;
  font-family: Marcellus;
  font-size: 32px;
  font-weight: 400;
  line-height: 36px;
  letter-spacing: -0.02em;
  // text-align: left;
}

.plp_desc {
  //styleName: desktop/B2 - 14 px;
  font-family: Inter;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: -0.02em;
  // text-align: left;

}

.plp_filter_name_desktop {
  //styleName: desktop/B1 - 16 px;
  color: @TextHeading;
  font-family: Inter;
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: -0.02em;
  // text-align: left;
  width: max-content; //20230210

}

.plp_filter_value {
  //styleName: Vsml, caption, label/Vsml body - 12px - Inter;
  font-family: Inter;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: left;
  color: @TextBody;


}

.clear-filter-style {
  /* desktop/uline text button - 14 */
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  /* identical to box height, or 143% */
  letter-spacing: -0.02em;
  text-decoration-line: underline;
  text-transform: uppercase;

  /* Button/Button Text Color */
  color: #777676;

}

.filter_cont_tab {
  display: flex;
  height: unset !important;
  gap: 12px;
  max-width: 270px;
  padding-left: 24px;
  flex-flow: wrap
}

.filter_cont_480 {
  display: flex;
  height: unset !important;
  gap: 12px;
  // max-width: 270px;
  // padding-left: 24px;
  flex-flow: wrap;
  padding-top: 12px;
}

.filterValueTab,
.filterValuePhn {
  padding: 0px;
}

.count_head {

  display: flex;
  gap: 8px;
  color: @TextLabel;
  //styleName: desktop/B1 - 16 px;
  font-family: Inter;
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: -0.02em;
  text-align: left;

}

.active {
  // color: var(--primaryColor);
  color: @TextHeading;
}

.paginationBar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 35px;
}

.pageBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: transparent;
  cursor: pointer;
  border: 1px solid gray;
  color: @TextBody;
  &.active {
    border-color: black;
  }
}
.pageArwBtn{
  border: none;
  background-color: transparent;
  cursor: pointer;
}
.pageArwBtn>svg>path{
  stroke: TextBody;
}
</style>
