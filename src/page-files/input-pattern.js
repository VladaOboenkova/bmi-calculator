$("#weight, #height").on("input", function(){
    if (/^0+/.test(this.value)){
        this.value = this.value.replace(/^0+/,'');
    }
    if (/^-*/.test(this.value)){
        this.value = this.value.replace(/^-*/,'');
    }
    if (/^\+*/.test(this.value)){
        this.value = this.value.replace(/^\+*/,'');
    }
})