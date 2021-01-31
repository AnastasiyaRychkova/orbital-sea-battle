$(document).ready(function(){
    $('.fill_chart').hide();
    $('.fill').click(function(){
        $(this).parent().parent().children('.box').children('.fill_chart').toggle();
        $(this).parent().parent().children('.box').children('.guess_element').hide();});
    });

    $(document).ready(function(){
    $('.guess_element').hide();
    $('.guess').click(function(){
        $(this).parent().parent().children('.box').children('.guess_element').toggle();
        $(this).parent().parent().children('.box').children('.fill_chart').hide();});
    });