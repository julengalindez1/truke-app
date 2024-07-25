<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\ContactStoreRequest;
use App\Http\Requests\ContactUpdateRequest;
use App\Http\Resources\ContactResource;
use App\Models\Contact;

class ContactController extends Controller
{
    public function index()
    {
        $contacts = Contact::all();
        return ContactResource::collection($contacts);
    }

    public function show(Contact $contact)
    {
        return new ContactResource($contact);
    }

    public function store(ContactStoreRequest $request)
    {
        $validatedData = $request->validated();
        $contact = Contact::create($validatedData);
        return new ContactResource($contact);
    }

    public function update(ContactUpdateRequest $request, $id)
    {
        $contact = $request->updateContact($id);

        return response()->json($contact);
    }

    public function destroy(Contact $contact)
    {
        $contact->delete();
        return response()->json(null, 204);
    }
}
