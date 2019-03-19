![Preview image](https://i.redd.it/o01oyz1odym21.png)

# TheDesktop
This application is made using [electronjs](https://electronjs.org/) which can be resource heavy but if you know web technologies it's easy to customize. It was made because I wanted to have a ricing tool where I would have full control. Feel free to fork it and make it your way. Any feedback would be appreciated.  
You can contact me by email - bul.wiktor@gmail.com  
Or discord - bullione#1021

## Installation:
Binaries can be found in releases direcotry.  
For instalation copy suitable folder to location of your choice. Respectively ia32 for 32-bit and x64 for 64-bit systems.  
To run it execute "thedesktop" file or add it to startup

#### Transparency
This heavily rely on transparency so you need to install some kind of compositor. I used it with compton and it works fine. For others you need to find out by yourself. 

#### Weather 
Because I don't have bought accuweather api package you need to make your own api key and configure it.  
Configuration file is inside config.js file (on release it's $application_direcotry/resources/app/config.js)  
To obtain api key you need to make an account at https://developer.accuweather.com and create your own app.  

1. Log in to your accyweather developer account
2. Click on [my apps](https://developer.accuweather.com/user/me/apps) and then click on button "add new app"
3. When your application is generaed copy api key and paste it inside config file where says "PASTE YOUR API KEY"

After that you need to obtain your location key 

1. Click on [api reference](https://developer.accuweather.com/apis) > [locations api](https://developer.accuweather.com/accuweather-locations-api/apis) > [city search](https://developer.accuweather.com/accuweather-locations-api/apis/get/locations/v1/cities/search)
2. You should see form 
3. Type your api key where it says apikey
4. "q" is a place to type your city name
5. You can leave everything blank
6. Click "send this request"
7. Below you should see response which is in json format
8. Copy number where it says "Key" and paste it in config where it says "PASTE YOUR LOCATION KEY"

Language code can be obtained [here](https://developer.accuweather.com/localizations-by-language)
