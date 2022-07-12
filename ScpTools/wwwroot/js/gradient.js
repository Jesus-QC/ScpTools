let colors = 2;
let copy = '';

generateGradient();

$( document ).ready(function (){
    Coloris({themeMode: 'dark', theme: 'polaroid',formatToggle: true,defaultColor: '#f00'});
});

$("#paste").click(function (){
    navigator.clipboard.readText()
        .then(text => {
            $("#input").val(text);
        })
        .catch(err => {
            console.error('Failed to read clipboard contents: ', err);
        });
});

$("#add-btn").click(function (){
    console.log(1);
    $("#color-list").append("<input value='#000000' type=\"text\" class=\"color-input\" id=\"color-" + colors + "\" data-coloris>");
    colors++;
    updateColoris();
});

$("#remove-btn").click(function (){
    console.log(2);
    if(colors === 2)
        return;

    $("#color-list").children().last().remove();
    colors--;
});

function updateColoris() {
    Coloris.wrap("[data-coloris]");
}

function getAllColors() {
    let ret = [];
    
    for(let i = 0; i < colors; i++){
        ret.push($("#color-" + i).val());
    }
    
    return ret;
}

function generateGradient(){
    copy = '';
    let word = $("#input").val();
    
    if(word.length < 1){
        return "<span>Input empty!</span>";
    }
    
    let rainbow = new Rainbow();
    rainbow.setNumberRange(1, word.length);
    rainbow.setSpectrumByArray(getAllColors());

    let ret = '';
    
    for(let i = 1; i <= word.length; i++){
        ret += "<span style='color: #" + rainbow.colourAt(i) + "'>" + word.at(i - 1) + "</span>";
        copy += "<color=#" + rainbow.colourAt(i) + ">" + word.at(i - 1) + "</color>";
    }

    let preview = $("#preview");
    
    preview.children().empty();
    preview.append(ret);
    
    return ret;
}

function copyGradient(){
    navigator.clipboard.writeText(copy).then(r => {
        console.log(r)
        Swal.fire({
            icon: 'success',
            title: 'Copied',
            showConfirmButton: false,
            timer: 1500
        })
    });
}