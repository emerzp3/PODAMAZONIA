$deps = Invoke-RestMethod "https://raw.githubusercontent.com/joseluisq/ubigeos-peru/master/json/departamentos.json"
$provs = Invoke-RestMethod "https://raw.githubusercontent.com/joseluisq/ubigeos-peru/master/json/provincias.json"
$dists = Invoke-RestMethod "https://raw.githubusercontent.com/joseluisq/ubigeos-peru/master/json/distritos.json"

$depMap = @{}
foreach ($d in $deps) { $depMap[$d.id_ubigeo] = $d.nombre_ubigeo }

$provMap = @{}
$provToDep = @{}
foreach ($p in $provs) {
    $provMap[$p.id_ubigeo] = $p.nombre_ubigeo
    $provToDep[$p.id_ubigeo] = $p.id_padre_ubigeo
}

$db = @{}
foreach ($d in $deps) { $db[$d.nombre_ubigeo] = [System.Collections.ArrayList]::new() }

foreach ($dist in $dists) {
    if ($provToDep.ContainsKey($dist.id_padre_ubigeo)) {
        $depId = $provToDep[$dist.id_padre_ubigeo]
        if ($depMap.ContainsKey($depId)) {
            $depName = $depMap[$depId]
            $provName = $provMap[$dist.id_padre_ubigeo]
            $distName = $dist.nombre_ubigeo
            $entryName = if ($provName -eq $distName) { $distName } else { "$distName ($provName)" }
            [void]$db[$depName].Add($entryName)
        }
    }
}

foreach ($k in @($db.Keys)) {
    $db[$k] = @($db[$k] | Sort-Object -Unique)
}

$jsonOutput = $db | ConvertTo-Json -Depth 5 -Compress
[System.IO.File]::WriteAllText("$PWD\ubigeo.js", "window.PERU_LOCATIONS = $jsonOutput;", [System.Text.Encoding]::UTF8)
Write-Host "ubigeo.js created successfully with $(@($dists).Count) districts."
