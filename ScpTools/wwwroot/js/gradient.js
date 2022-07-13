let colors = 2;

generateGradient();

$( document ).ready(function (){
    Coloris({themeMode: 'dark', theme: 'polaroid',defaultColor: '#f00', alpha: false, format: 'hex'});
});

document.addEventListener('coloris:pick', event => {
    generateGradient();
});

$("#add-btn").click(function (){
    console.log(1);
    $("#color-list").append("<input value='#000000' type=\"text\" class=\"color-input\" id=\"color-" + colors + "\" data-coloris>");
    colors++;
    updateColoris();
    generateGradient();
});

$("#remove-btn").click(function (){
    console.log(2);
    if(colors === 2)
        return;

    $("#color-list").children().last().remove();
    colors--;
    generateGradient();
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
    let word = $("#input").val();
    
    if(word.length < 2){
        Swal.fire({
            icon: 'error',
            title: 'Input not long enough, it needs at least 2 characters.',
            showConfirmButton: false,
            timer: 1500
        });
        return;
    }
    
    let rainbow = new Rainbow();
    rainbow.setNumberRange(1, word.length);
    rainbow.setSpectrumByArray(getAllColors());

    let ret = '';
    let copy = '';
    
    for(let i = 1; i <= word.length; i++){
        let char = word.at(i - 1);
        
        if(char === ' '){
            copy += ' ';
            ret += ' ';
            continue;
        }
        
        let color = "#" +  rainbow.colourAt(i);
        
        ret += "<span style='color: " + color + "'>" + char + "</span>";
        copy += "<color=" + color + ">" + char + "</color>";
    }

    $("#output").val(copy)
    
    let preview = $("#name");
    
    preview.children().empty();
    preview.append(ret);
    
    return ret;
}

function copyGradient(){
    navigator.clipboard.writeText($("#output").val()).then(r => {
        console.log(r)
        Swal.fire({
            icon: 'success',
            title: 'Copied',
            showConfirmButton: false,
            timer: 1500
        })
    });
}