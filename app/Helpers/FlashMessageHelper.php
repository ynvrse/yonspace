<?php

if (!function_exists('flashMessage')) {
    function flashMessage($message, $type =  'success'): void
    {
        logger()->info("flashMessage called with message: {$message}");
        session()->flash('message', $message);

        session()->flash('type', $type);
    }
}
