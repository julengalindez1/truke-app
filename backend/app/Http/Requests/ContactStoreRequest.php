<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ContactStoreRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'provider_id' => 'required',
            'name' => 'required',
            'type' => 'required',
            'schedule' => 'required',
        ];
    }
}
