<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\View;

class Sendmail extends Mailable
{
    use Queueable, SerializesModels;

    public $mailData;

    /**
     * Create a new message instance.
     */
    public function __construct($mailData)
    {
        $this->mailData = $mailData;

    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: $this->mailData['title'],
        );
    }

    /**
     * Get the message content definition.
     */
    public function build()
    {
        $view1Content = View::make('email', ['mailData' => $this->mailData])->render();
        $view2Content = View::make('forgetPass', ['mailData' => $this->mailData])->render();
        $view3Content = View::make('newAccount', ['mailData' => $this->mailData])->render();

        if ($this->mailData['title'] == 'Forget Password') {
            $this->subject('Forget Password');
            return $this->subject($this->mailData['title'])
                ->html($view2Content);
        }elseif ($this->mailData['title'] == 'New Account') {
            $this->subject('New Account');
            return $this->subject($this->mailData['title'])
                ->html($view3Content);
        }else{
            $this->subject($this->mailData['title']);
            return $this->subject($this->mailData['title'])
                ->html($view1Content);
        }
    }

    /**
     * Get the attachments for the message.
     *
     * @return array
     */
    public function attachments(): array
    {
        return [];
    }
}
