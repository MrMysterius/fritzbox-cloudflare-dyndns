# FritzBox Cloudflare DynDns

> NodeJS web server service for updating Clouflare DNS records.

A Service for changing / updating DNS records on cloudflare with a simple url query. Mainly made for use with an fritzbox.

## Prerequisites

- NodeJS (Version 16,20 Tested to be working, so go with anything above 16 for now)
- NPM (Should come with NodeJS)

## Installation

1. Clone the Repository
2. CD into the cloned repository
3. Install dependencies `npm install`
4. Build/Compile the Application `npm run build`
5. Now you can start the application everytime with `npm run start`

## Usage

How to change DNS Record(s) with a URL query?:

The query looks as follows: `<ip>:2525/dyndns?token=<clouflare_api_token>&zones=<zones>&records=<records>&ip4=<ip4_address>`

> NOTE: if you use the FritzBox DynDns then use Custom Servcice and as `<ip4_address>` use just this `<ip4>` because FritzBox will automatically replace that with the new Public IP address of the FritzBox. Also just put some arbitraty random data into the other fields (Domain, username, password).

Replace the following things as followed:

| Token                    | Description                                                                                                                                                                                                   |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<cloudflare_api_token>` | This should be the cloudflare api token you get from clouflare, with the permissions of updating all the zones you want to update records on.                                                                 |
| `<zones>`                | This is a comma seperated list of all the zones you want to update records on. For example: `example.com,example.org,example.net`                                                                             |
| `<records>`              | This is a comma seperated list of the records on the zones you want to update. Note that the first record will be on the first zone, the second on the second zone and so on. For example: `test,test2,test3` |
| `<ip4_address>`          | This is the new IP4 Address the records that will be updated will get.                                                                                                                                        |

## Updates/Problems/Project Side Note

I do not guarantee any updates on this project since it is mainly for my own purposes and I have put it up here for others that need something minimal for dynamically updating their DNS records on cloudflare.
