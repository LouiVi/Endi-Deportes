cfg.Light;

app.LoadPlugin( "UIExtras" );

var pi = new Array();
var pi2 = new Array();

var categories = ["Ultima Hora", "Noticias", "Negocios", "Entretenimiento", "Deportes", "English", "Gastronomía", "De Viaje", "Galerías", "Opinión", "Estilos de vida"];

var feeds = ["https://www.elnuevodia.com/arc/outboundfeeds/rss/?outputType=xml","https://www.elnuevodia.com/arc/outboundfeeds/rss/category/noticias/?outputType=xml","https://www.elnuevodia.com/arc/outboundfeeds/rss/category/negocios/?outputType=xml","https://www.elnuevodia.com/arc/outboundfeeds/rss/category/entretenimiento/?outputType=xml","https://www.elnuevodia.com/arc/outboundfeeds/rss/category/deportes/?outputType=xml","https://www.elnuevodia.com/arc/outboundfeeds/rss/category/english/?outputType=xml","https://www.elnuevodia.com/arc/outboundfeeds/rss/category/gastronomia/?outputType=xml","https://www.elnuevodia.com/arc/outboundfeeds/rss/category/de-viaje/?outputType=xml","https://www.elnuevodia.com/arc/outboundfeeds/rss/?query=type:gallery?outputType=xml","https://www.elnuevodia.com/arc/outboundfeeds/rss/category/opinion/?outputType=xml","https://www.elnuevodia.com/arc/outboundfeeds/rss/category/estilos-de-vida/?outputType=xml"];

//Called when application is started.
function OnStart()
{

//
var theme = app.CreateTheme( "Dark" );
theme.SetTitleColor("#fffa0000");
app.SetTheme( theme );
//alert(app.GetThemeInfo().textColor1);
	uix = app.CreateUIExtras();
	//Create a layout with objects vertically centered.
	lay = app.CreateLayout( "Linear", "Top,HCenter,FillXY" )

	//Create a text label and add it to layout.
	/*txt = app.CreateText( "Hello" )
	txt.SetTextSize( 32 )
	lay.AddChild( txt )
	*/
	spinner = app.CreateSpinner( categories, 1, -1 );
	spinner.SetOnChange( spnChange )
	lay.AddChild( spinner );
 picker = uix.CreatePicker( "", 0.95 );
 picker.SetOnChange( OnChange );
 lay.AddChild( picker );
 
 web = app.CreateWebView( 1, -1, "IgnoreErrors, IgnoreSSLErrors");
 lay.AddChild( web ),
	//Add layout to app.	
	app.AddLayout( lay )
	
	//var tts = app.createsp
	// Example usage
//	let deportes = "https://www.elnuevodia.com/arc/outboundfeeds/rss/category/deportes/otros-deportes/?outputType=xml";
	var  feed  = "https://www.espn.com/espn/rss/news";
	//var categories = ["Ultima Hora", "Noticias", "Negocios", "Entretenimiento", "Deportes", "English", "Gastronomía", "De Viaje", "Galerías", "Opinión", "Estilos de vida"];

//var feeds = ["https://www.elnuevodia.com/arc/outboundfeeds/rss/?outputType=xml","https://www.elnuevodia.com/arc/outboundfeeds/rss/category/noticias/?outputType=xml","https://www.elnuevodia.com/arc/outboundfeeds/rss/category/negocios/?outputType=xml","https://www.elnuevodia.com/arc/outboundfeeds/rss/category/entretenimiento/?outputType=xml","https://www.elnuevodia.com/arc/outboundfeeds/rss/category/deportes/?outputType=xml","https://www.elnuevodia.com/arc/outboundfeeds/rss/category/english/?outputType=xml","https://www.elnuevodia.com/arc/outboundfeeds/rss/category/gastronomia/?outputType=xml","https://www.elnuevodia.com/arc/outboundfeeds/rss/category/de-viaje/?outputType=xml","https://www.elnuevodia.com/arc/outboundfeeds/rss/?query=type:gallery?outputType=xml","https://www.elnuevodia.com/arc/outboundfeeds/rss/category/opinion/?outputType=xml","https://www.elnuevodia.com/arc/outboundfeeds/rss/category/estilos-de-vida/?outputType=xml"];

	//https://www.elnuevodia.com/arc/outboundfeeds/rss/category/estilos-de-vida/?outputType=xml";//https://www.elnuevodia.com/arc/outboundfeeds/rss/?query=type:gallery?outputType=xml";
//const deportes = "https://www.elnuevodia.com/arcio/rss/category/deportes/";
//app.HttpRequest( "GET", feed, null, null, handReply);
//fetchAndDisplayRSS(feed);

}

function spnChange(item, index){
//app.HttpRequest( "GET", feeds[index], null, null, handReply);
fetchAndDisplayRSS(feeds[index]);
}

function handReply(error, result){
alert(result);
app.WriteFile( app.GetAppPath()+"/feed.html", result );
//Create and run web server on port 8075
    serv = app.CreateWebServer( 8075, "Upload,ListDir" );
    serv.SetFolder( app.GetAppPath() );
    //serv.SetOnReceive( serv_OnReceive );
    serv.Start();
    fetchAndDisplayRSS("http://"+app.GetIPAddress()+":8075/feed.html");
}
// Function to fetch and parse RSS feed
async function fetchAndDisplayRSS(url) {
    try {
        // Fetch the RSS feed
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        // Get the text content of the response
        const text = await response.text();
        
        // Parse the RSS feed using DOMParser
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, "text/xml");
        
        // Check for parsing errors
        const errorNode = xmlDoc.getElementsByTagName("parsererror");
        if (errorNode.length > 0) {
            throw new Error('Error parsing XML');
        }

        // Extract items from the RSS feed
        const items = xmlDoc.getElementsByTagName("item");
        const list = document.createElement('ul');

pi.push('Roll this to view a feed');
pi2.push('');

        // Loop through each item and create a list element
        Array.from(items).forEach(item => {
        		
            const title = item.getElementsByTagName("title")[0].textContent;
            const link = item.getElementsByTagName("link")[0].textContent;

            var listItem = "";//document.createElement('li');
            listItem = `<a href="${link}" target="_blank">${title}</a>`;
            //list.appendChild(
            //alert(JSON.stringify(listItem));
            pi2.push(link);
            pi.push(title.split(",").join(";"));
        });
picker.SetList(pi.join(","));
        // Append the list to a specific element in your HTML
        //document.getElementById('rssFeed').appendChild(list);
        //alert(list);
    } catch (error) {
        console.error('Error fetching or parsing RSS feed:', error);
    }
}

function OnChange( item, index )
{
 //app.ShowPopup( item + " : " + index );
 app.HttpRequest( "GET", pi2[index], null, null, handReply2);
 //web.LoadUrl( pi2[index] );
 //web.Execute(  "document.body.innerHTML;", Res);
}

function Res(results)
{
	app.TextToSpeech( results, 1, 1, null );
}

function handReply2(error, results)
{

	results = results.replace("<HEAD>", '<HEAD><script src="ds:/Sys/app.js"></script>');
	results = results.replace("<head>", '<head><script src="ds:/Sys/app.js"></script>');
	resutts = results.replace("<body ", "<body onload='alert();' ");
	//alert(results);
	web.LoadHtml( results, "https://www.elnuevodia.com/");
	app.WriteFile( "Endi.txt", results );
	web.Execute( "document.body.innerText;", Res );
	//web.Execute( "app.TextToSpeech( document.body.innerText, 1, 1, ()=>{alert('hello');});"  );
}