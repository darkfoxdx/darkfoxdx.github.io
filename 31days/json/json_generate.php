<?php 
    require_once("json_generate_fx.php");
    $entry_day = $_POST['entry_day'];
    $entry_title = $_POST['entry_title'];
    
    $position_array = $_POST['position'];
    $text_array = $_POST['text']; //TODO convert_smart_quotes
    $type_array = $_POST['type'];
    
    $img_exist = $_POST['img_exist'];
    if (!isset($img_exist)) {
        $img_exist = -1;
    }
    $preview = file_get_contents("template.json");
    $save = $_POST['save'];
    $id = sprintf("day%02d", $entry_day);
    
    $json_id = $entry_day;
    
    $preview = str_replace("\"{id}\"", $json_id, $preview);
    if (is_array($type_array) || is_object($type_array)) {
        foreach ($type_array as $key => $type) {
            switch($type) {
                case "entry":
                    $preview = str_replace("{entry_day}", $entry_day, $preview);
                    $preview = str_replace("{entry_title}", $entry_title, $preview);

                    $preview = str_replace("{type}", $type_array[$key], $preview);
                    $preview = str_replace("{position}", $position_array[$key], $preview);
                    $preview = str_replace("\"{text}\"", format_text_for_poem($text_array[$key]), $preview);
                    $preview = str_replace("\"{img_exist}\"", $img_exist==$key ? 'true' : 'false', $preview);
                    break;
                case "poem":
                    $new_component = file_get_contents("template_object.json");
                    $new_component = str_replace("{type}", $type_array[$key], $new_component);
                    $new_component = str_replace("{position}", $position_array[$key], $new_component);
                    $new_component = str_replace("\"{text}\"", format_text_for_poem($text_array[$key]), $new_component);
                    $new_component = str_replace("\"{img_exist}\"", $img_exist==$key ? 'true' : 'false', $new_component);
                    $more_array[] = $new_component;
                    break;
                case "blog":
                    $new_component = file_get_contents("template_object.json");
                    $new_component = str_replace("{type}", $type_array[$key], $new_component);
                    $new_component = str_replace("{position}", $position_array[$key], $new_component);
                    $new_component = str_replace("\"{text}\"", format_text_for_blog($text_array[$key]), $new_component);
                    $new_component = str_replace("\"{img_exist}\"", $img_exist==$key ? 'true' : 'false', $new_component);
                    $more_array[] = $new_component;
                    break;
            }    
        }
    }
    
    if (count($more_array) !== 0) {
        $more = implode(','.PHP_EOL, $more_array);
    } else {
        $more = "";
    }
    $preview = str_replace("\"{more}\"", $more, $preview);
    
    //For HTML preview
    $preview_parsed = str_replace(" ",'&nbsp;', $preview);
    $preview_parsed = str_replace("<",'&lt;', $preview_parsed);
    $preview_parsed = str_replace(">",'&gt;', $preview_parsed);
    $preview_parsed = nl2br($preview_parsed);
    
    if(isset($save)) {
        $file_name = "{$id}.json";
        $file = fopen($file_name, "w");
        fwrite($file, $preview);
        fclose($file);
    }
?>
<!DOCTYPE html>
<html>
    <head>
        <script src="json_generate.js" type="text/javascript"></script>
        <meta charset="UTF-8">
        <title>31 Days</title>
    </head>
    <body onload="setGlobalValue(<?=count($type_array)?>)">
        <form id="form_json_generator" method="post">
            <input type="hidden" name="type[0]" value="entry">Entry<br>
            Entry Day: <input type="number" name="entry_day" form="form_json_generator" value="<?=$entry_day?>"><br>
            Entry Title: <input type="text" name="entry_title" form="form_json_generator" value="<?=$entry_title?>"><br>
            <label for="img_exist">Img: </label><input type="checkbox" name="img_exist" id="img_exist" form="form_json_generator" value="0" <?php if ($img_exist==0) echo 'checked';?>><br>            
            <input type="radio" name="position[0]" id="left" value="left" <?php if ($position_array[0] === 'left') echo 'checked';?>><label for="left"> Left</label>
            <input type="radio" name="position[0]" id="center" value="center" <?php if ($position_array[0] === 'center') echo 'checked';?>><label for="center"> Center</label>
            <input type="radio" name="position[0]" id="right" value="right" <?php if ($position_array[0] === 'right') echo 'checked';?>><label for="right"> Right</label>
            <input type="radio" name="position[0]" id="justify" value="justify" <?php if ($position_array[0] === 'justify') echo 'checked';?>><label for="justify"> Justify<br></label>
            <textarea rows="15" cols="80" name="text[0]" form="form_json_generator"><?=stripslashes($text_array[0]) ?></textarea><br>
            <div id="more">
                <?php 
                    if (is_array($type_array) || is_object($type_array)) {
                        foreach ($type_array as $key => $type) {
                            if ($key == 0) continue;
                            echo
                            '<input type="hidden" name="type['.$key.']" value="'.$type.'">'.$type.'<br>'.
                            '<label for="img_exist'.$key.'">Img: </label><input type="checkbox" name="img_exist" id="img_exist'.$key.'" form="form_json_generator" value="'.$key.'" '.($img_exist==$key ? 'checked' : '').'><br>'.
                            '<input type="radio" name="position['.$key.']" id="left'.$key.'" value="left" '.($position_array[$key] === 'left' ? 'checked' : '').'><label for="left'.$key.'"> Left</label>'.
                            '<input type="radio" name="position['.$key.']" id="center'.$key.'" value="center" '.($position_array[$key] === 'center' ? 'checked' : '').'><label for="center'.$key.'"> Center</label>'.
                            '<input type="radio" name="position['.$key.']" id="right'.$key.'" value="right" '.($position_array[$key] === 'right' ? 'checked' : '').'><label for="right'.$key.'"> Right</label>'.
                            '<input type="radio" name="position['.$key.']" id="justify'.$key.'" value="justify" '.($position_array[$key] === 'justify' ? 'checked' : '').'><label for="justify'.$key.'"> Justify<br></label>'.
                            '<textarea rows="15" cols="80" name="text['.$key.']" form="form_json_generator">'.$text_array[$key].'</textarea><br>';
                        }
                    }
                ?>
            </div>
            <input type="button" onclick="addMore('blog')" value="Add Blog">
            <input type="button" onclick="addMore('poem')" value="Add Poem">
            <input type="button" onclick="clearMore()" value="Clear More">
            <input type="reset" value="Clear All">
            <input type="submit" value="Preview">
            <input type="submit" name="save" value="Save"><br>
        </form>
        <button id="copy-button" onclick="copyText('preview-area')">Copy</button>
        <br>
        <br>
        <div id="preview-area">
        <?=$preview_parsed ?>
        </div>
        <div>
            <?php print_r($_POST); ?>
        </div>
    </body>
</html>
