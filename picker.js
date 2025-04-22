app.LoadPlugin( "UIExtras" );

function OnStart()
{
 lay = app.CreateLayout( "Linear", "VCenter,FillXY" );

 uix = app.CreateUIExtras();
 
 picker = uix.CreatePicker( "Bilbo,Frodo,Gandalf", 0.4 );
 picker.SetOnChange( OnChange );
 lay.AddChild( picker );
 
 app.AddLayout( lay );
}

function OnChange( item, index )
{
 app.ShowPopup( item + " : " + index );
}