// filename, name, bytes, parts, part size
zipMods = [
	['halva_en.zip', 'Half-Life EN (MENU LAGS) (214M)', 214283501, 21, 10485760],
	['halva_en.zip', 'Half-Life EN (MENU LAGS) (214M) (DUPLICATE FOR FIX)', 214283501, 21, 10485760]
];

pkgMods = [
];
var selectZip=document.getElementById('selectZip');
var iArgs=document.getElementById('iArgs');
selectZip.addEventListener('change', function(){
	if(selectZip.value=="halva_en.zip")
	{
		//alert('Bugs: menu lagging.');
		iArgs.value="-dev 0 -game valve";
	}
});