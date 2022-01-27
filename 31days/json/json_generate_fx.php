<?php 
    function convert_smart_quotes($string) { 
        $search = array(chr(145), 
                        chr(146), 
                        chr(147), 
                        chr(148), 
                        chr(151)); 

        $replace = array("'", 
                         "'", 
                         '"', 
                         '"', 
                         '-'); 

        return str_replace($search, $replace, $string); 
    }
    function format_text_for_poem($str_in) {
        $five_tabs = "                ";
        $str_out = preg_replace("/\\\'/", "'", $str_in);
        $str_out = str_replace("  ",'&nbsp;&nbsp;', $str_out);
        $str_out = str_replace("   ",'&nbsp;&nbsp;&nbsp;', $str_out);
        $str_out = str_replace("    ",'&nbsp;&nbsp;&nbsp;&nbsp;', $str_out);
        $str_out = str_replace("     ",'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;', $str_out);
        $str_out = str_replace("      ",'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;', $str_out);
        $str_out = str_replace("       ",'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;', $str_out);
        $str_out = str_replace("        ",'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;', $str_out);
        $str_out = " \"<p>\",{newline}{$five_tabs}\"{$str_out}\",{newline}{$five_tabs}\"</p>\"";
        $str_out = preg_replace("/\r\n\r\n/",  "\",{newline}{$five_tabs}\"</p>\",{newline}{$five_tabs}\"<p>\",{newline}{$five_tabs}\"", $str_out);
        $str_out = preg_replace("/\n\n/",      "\",{newline}{$five_tabs}\"</p>\",{newline}{$five_tabs}\"<p>\",{newline}{$five_tabs}\"", $str_out);
        $str_out = preg_replace("/\r\n/",      "<br>\",{newline}{$five_tabs}\"", $str_out);
        $str_out = preg_replace("/\n/",        "<br>\",{newline}{$five_tabs}\"", $str_out);
        $str_out = preg_replace("/{newline}/",   "\n", $str_out);
        return $str_out;
    }
    
    function format_text_for_blog($str_in) {
        $five_tabs = "                ";
        $str_out = preg_replace("/\\\'/", "'", $str_in);
        $str_out = " \"<p>\",{newline}{$five_tabs}\"{$str_out}\",{newline}{$five_tabs}\"</p>\"";
        $str_out = preg_replace("/\r\n\r\n/",  "\",{newline}{$five_tabs}\"</p>\",{newline}{$five_tabs}\"<p>\",{newline}{$five_tabs}\"", $str_out);
        $str_out = preg_replace("/\n\n/",      "\",{newline}{$five_tabs}\"</p>\",{newline}{$five_tabs}\"<p>\",{newline}{$five_tabs}\"", $str_out);
        $str_out = preg_replace("/\r\n/",      "\",{newline}{$five_tabs}\"", $str_out);
        $str_out = preg_replace("/\n/",        "\",{newline}{$five_tabs}\"", $str_out);
        $str_out = preg_replace("/{newline}/",   "\n", $str_out);
        return $str_out;
    }