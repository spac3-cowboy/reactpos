<?php

namespace App\Http\Controllers;

use App\Models\Bcc;
use App\Models\Cc;
use App\Models\Email;
use App\Models\EmailConfig;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\Sendmail;

class EmailController extends Controller
{
    public function sendEmail(Request $request): JsonResponse
    {
        try {
            //get the email config
            $emailConfig = EmailConfig::first();

            //check the emailConfigName and req name is the same
            if ($emailConfig->emailConfigName != request('emailConfigName')) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Email config name is not correct.'
                ], 400);
            }
            //set the config
            config([
                'mail.mailers.smtp.host' => $emailConfig->emailHost,
                'mail.mailers.smtp.port' => $emailConfig->emailPort,
                'mail.mailers.smtp.encryption' => $emailConfig->emailEncryption,
                'mail.mailers.smtp.username' => $emailConfig->emailUser,
                'mail.mailers.smtp.password' => $emailConfig->emailPass,
                'mail.mailers.smtp.local_domain' => env('MAIL_EHLO_DOMAIN'),
                'mail.from.address' => $emailConfig->emailUser,
                'mail.from.name' => $emailConfig->emailConfigName,
            ]);

            $cc = $request->cc;
            $bcc = $request->bcc;

            //create email
            $createEmail = Email::create([
                'senderEmail' => $emailConfig->emailUser,
                'receiverEmail' => $request->receiverEmail,
                'subject' => $request->subject,
                'body' => $request->body,
                'emailStatus' => 'sent',
            ]);

            //create cc
            if ($cc) {
                foreach ($cc as $ccEmail) {
                    Cc::create([
                        'emailId' => $createEmail->id,
                        'ccEmail' => $ccEmail,
                    ]);
                }
            }

            //create bcc
            if ($bcc) {
                foreach ($bcc as $bccEmail) {
                    Bcc::create([
                        'emailId' => $createEmail->id,
                        'bccEmail' => $bccEmail,
                    ]);
                }
            }

            function updateEmailStatus($status, Email $email): void
            {
                $email->update([
                    'emailStatus' => $status,
                ]);
            }

            if (!$cc && !$bcc) {
                //send the email
                $mailData = [
                    'title' => $request->subject,
                    'body' => $request->body,
                ];
                $email = Mail::to($request->receiverEmail)->send(new Sendmail($mailData));

                if ($email) {
                    updateEmailStatus('sent', $createEmail);
                } else {
                    updateEmailStatus('failed', $createEmail);
                }
                return response()->json([
                    'status' => 'success',
                    'message' => 'Email is sent successfully.'
                ], 200);
            } else if ($cc && !$bcc) {
                //send the email
                $mailData = [
                    'title' => $request->subject,
                    'body' => $request->body,
                ];
                $email = Mail::to($request->receiverEmail)->cc($cc)->send(new Sendmail($mailData));

                if ($email) {
                    updateEmailStatus('sent', $createEmail);
                } else {
                    updateEmailStatus('failed', $createEmail);
                }
                return response()->json([
                    'status' => 'success',
                    'message' => 'Email is sent successfully.'
                ], 200);
            } else if (!$cc && $bcc) {
                //send the email
                $mailData = [
                    'title' => $request->subject,
                    'body' => $request->body,
                ];
                $email = Mail::to($request->receiverEmail)->bcc($bcc)->send(new Sendmail($mailData));

                if ($email) {
                    updateEmailStatus('sent', $createEmail);
                } else {
                    updateEmailStatus('failed', $createEmail);
                }
                return response()->json([
                    'status' => 'success',
                    'message' => 'Email is sent successfully.'
                ], 200);
            } else {
                //send the email
                $mailData = [
                    'title' => $request->subject,
                    'body' => $request->body,
                ];
                $email = Mail::to($request->receiverEmail)->cc($cc)->bcc($bcc)->send(new Sendmail($mailData));

                if ($email) {
                    updateEmailStatus('sent', $createEmail);
                } else {
                    updateEmailStatus('failed', $createEmail);
                }
                return response()->json([
                    'status' => 'success',
                    'message' => 'Email is sent successfully.'
                ], 200);
            }
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during sending email. Please try again later.'], 500);
        }
    }

    //get all emails
    public function getEmails(): JsonResponse
    {
        try {
            $emails = Email::with('cc', 'bcc')->get();
            return response()->json($emails);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during get emails. Please try again later.'], 500);
        }
    }

    //getSingleEmail
    public function getSingleEmail(Request $request): JsonResponse
    {
        try {
            $email = Email::with('cc', 'bcc')->find($request->id);
            return response()->json($email);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during get email. Please try again later.'], 500);
        }
    }

    //deleteEmail
    public function deleteEmail(Request $request): JsonResponse
    {
        try {
            $email = Email::find($request->id);
            $email->delete();
            return response()->json([
                'message' => 'Email is deleted successfully.'
            ], 200);
        } catch (Exception $err) {
            return response()->json(['error' => 'An error occurred during delete email. Please try again later.'], 500);
        }
    }
}
