<template>
    <div class="quill-editor">
        <quill-editor 
        v-model="content"
        ref="myQuillEditor"
        :options="editorOption"
        @change="editChange($event)"
        >
        </quill-editor>    
    </div>
</template>

<script>
import axios from 'axios'
import {quillEditor, Quill} from 'vue-quill-editor'
import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'
Quill.register('modules/ImageExtend', ImageExtend)

export default {
    props: {
        value: {
            type: Object
        }
    },
    data() {
        return {
            content: this.value.content,
            contentText: this.value.contentText,
            token: '',
            editorOption: {
                modules: {
                    ImageExtend: {
                        loading: true,
                        name: 'file',
                        action: "https://upload-z1.qiniup.com",
                        response: (res) => {
                            console.log(res)
                            return res.url
                        },
                        change: (xhr, formData) => {
                            formData.append('token', this.token)
                        } 
                    },
                    toolbar: {
                        container: container,
                        handlers: {
                            'image': function () {
                                QuillWatch.emit(this.quill.id)
                            }
                        }
                    }
                }
            }        
        };
    },
    components: {},
    methods: {
        editChange({quill, html, text}) {
            this.$emit('input', {
                content: html,
                contentText: text
            })
        },
        getToken() {
            axios.get('http://upload.yaojunrong.com/getToken').then(res => {
                if(res.data.code == 200) {
                    this.token = res.data.data
                }
            })
        }
    },
    created() {
        this.getToken()
    },
    watch: {
        value(val) {
            this.content = val.content
            this.contentText = val.contentText
        }
    }
};
</script>

<style scoped lang="scss">
</style>
