<?php

namespace App\Http\Requests;

use App\Models\Contact;
use Illuminate\Foundation\Http\FormRequest;

class ContactUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'provider_id' => 'nullable|max:255',
            'name' => 'nullable|max:255',
            'type' => 'nullable|max:255',
            'schedule' => 'nullable|max:255',
        ];
    }

    public function updateContact($id)
    {
        $contact = Contact::findOrFail($id);

        $formDataFilteredByNullValues = array_filter($this->validated(), function ($value) {
            return $value !== null;
        });
        $contact->update($formDataFilteredByNullValues);

        return $contact;
    }
}
