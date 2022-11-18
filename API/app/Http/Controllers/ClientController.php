<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Laravel\Sanctum\HasApiTokens;

class ClientController extends Controller
{
    function store(Request $request){
        $validator = Validator::make($request->all(),[
            'email' => 'required|email|unique:clients|max:30',
            'message' => 'required|string|max:30',
            'password' => 'required|confirmed|min:8',
        ]);
        if($validator->fails()){
            return response()->json([
                'etat'=> 400,
                'message_errors'=> $validator->messages()
            ]);
        }else{
            $client = new Client();
            $client->email = $request->input('email');
            $client->message = $request->input('message');
            $client->password = Hash::make($request->input('password'));
            $client->save();
            return response()->json([
                "etat" => 200,
                "message" => "You have been successfully registered",
            ]);
        }
    }
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required',
            'password' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 'empty',
                'messages' => $validator->messages()
            ]);
        }
        //User check
        else if (Auth::guard('client')->attempt(['email' => $request->email, 'password' => $request->password])) {
            $client=Auth::guard('client')->user();
            //Setting login response
            //                             name                abilities
            $token = $client->createToken('log_token_client', ['client'])->plainTextToken;
            $success['token'] = $token;
            // $success['last_name'] =  $admin->last_name;
            // $success['email'] =  $admin->email;
            // $success['image'] =  $admin->image;
            // $session = $request->session()->regenerate();
            return response()->json([
                'status' => 'success',
                'dataToken' => $success,
                'client'=> $client
            ]);
        } else {
            return response()->json([
                'status' => 'error',
                'data' => 'Unauthorized Access'
            ]);
        }
    }
    public function recruiterLogout(Request $request)
    {
        auth('recruiter')->logout();
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            'status'=> 'success',
            'message' => 'Logged out succefully'
        ]);
    }
    public function getRecruiter()
    {
        $recruiter=Auth::user();
        return response()->json([
            'status' => 'success',
            'recruite' => $recruiter
        ]);
    }
}
