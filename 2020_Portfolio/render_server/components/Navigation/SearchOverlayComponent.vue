<template>
    <v-overlay class="search-overlay"
               :color="color"
               :value="searchOverlay"
               opacity="1" absolute z-index="3"
               @keyup.esc="closeSearchOverlay"
               @click.prevent="closeSearchOverlay">
        <v-card class="search-overlay-card" color="black" width="100%">
            <div class="search-overlay-close-button-container">
                <close-button-component :color="'white'" @click="closeSearchOverlay"/>
            </div>
            <div class="search-overlay-form-container">
                <table class="search-overlay-form">
                    <tr>
                        <td class="search-overlay-text-field-container">
                            <v-text-field
                                    dark
                                    color="rgb(144, 107, 255)"
                                    solo flat outlined required :dense = true hide-details
                                    height="100%"
                                    ref="input"
                                    v-model="searchText"
                                    placeholder="검색"
                                    @keyup.esc="closeSearchOverlay"
                                    @keyup.enter.exact="searchPost" />
                        </td>
                        <td class="search-overlay-search-button-container">
                            <search-button-component :color="'rgb(144, 107, 255)'" @click="searchPost"/>
                        </td>
                    </tr>
                </table>
            </div>
        </v-card>
        <span class="search-overlay-hash-tag-container">
            <hash-tag-card-component :hashTagName="'all'" :color="'rgb(144, 107, 255)'" :text-color="'white'" @closeSearchOverlay="closeSearchOverlay"/>
        </span>
        <span class="search-overlay-hash-tag-container" v-for="(hashTag, index) in hashTags" :key="index">
            <hash-tag-card-component :hashTagName="hashTag.tagName" :color="'rgb(144, 107, 255)'" :text-color="'white'" @closeSearchOverlay="closeSearchOverlay"/>
        </span>
    </v-overlay>
</template>

<script>
    import HashTagCardComponent from "../HashTag/HashTagCardComponent";
    import CloseButtonComponent from "../Button/CloseButtonComponent";
    import SearchButtonComponent from "../Button/SearchButtonComponent";

    export default {
        name: "SearchOverlayComponent",
        components: {
            SearchButtonComponent,
            CloseButtonComponent,
            HashTagCardComponent
        },
        props : {
            color: String,
            searchOverlay : Boolean,
        },
        data() {
            return {
                searchText : "",
            }
        },
        computed : {
            hashTags() {
                return this.$store.state.post.allHashTags
            }
        },
        methods : {
            closeSearchOverlay() {
                this.$emit('closeSearchOverlay');
            },
            async searchPost() {
                if (this.searchText === '') {
                    return 0;
                } else {
                    this.closeSearchOverlay();
                    this.$router.push(`/search?q=${this.searchText}`)
                }
            },
        },
        updated() {
            if (this.$refs.input) {
                this.$refs.input.onFocus();
            }
        }
    }
</script>

<style scoped>
    .search-overlay {
        position: fixed;
        top: 0;
    }
    .search-overlay-card {
        position: fixed;
        top:0;
        left: 0;
        padding: 20px;
    }
    .search-overlay-close-button-container {
        float: right;
    }
    .search-overlay-form-container {
        display: flex;
        clear: both;
        overflow: auto;
        padding: 20px 0
    }
    .search-overlay-form {
        width: 500px;
        margin: auto;
    }
    .search-overlay-text-field-container {
        width: 100%;
        padding-right: 5px;
    }
    .search-overlay-search-button-container {
        height: 100%;
        padding-left: 5px;
    }
    .search-overlay-hash-tag-container {
        display: inline-block;
        margin: 5px
    }
</style>