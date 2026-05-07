$productsDir = Join-Path $PSScriptRoot "assets\products"
$outputFile = Join-Path $PSScriptRoot "products.js"

$productsArray = @()

if (Test-Path $productsDir) {
    # Expected: assets/products/<Categoria>/<Producto>/<imagenes>
    $categories = Get-ChildItem -Path $productsDir -Directory

    foreach ($category in $categories) {
        $catName = $category.Name
        
        $products = Get-ChildItem -Path $category.FullName -Directory

        foreach ($product in $products) {
            $prodName = $product.Name
            
            $images = Get-ChildItem -Path $product.FullName -File | Where-Object { $_.Extension -match "\.(jpg|jpeg|png|webp)$" }
            
            if ($images.Count -gt 0) {
                # Get relative paths for images
                $imagePaths = @()
                foreach ($img in $images) {
                    $relPath = "assets/products/$catName/$prodName/$($img.Name)"
                    $imagePaths += "`"$relPath`""
                }
                
                $imgArrayStr = "[" + ($imagePaths -join ", ") + "]"
                
                $price = 'S/ 0.00'
                $catLower = $catName.ToLower()
                if ($catLower -eq 'camisas') { $price = 'S/ 60.00' }
                elseif ($catLower -eq 'cuadernos') { $price = 'S/ 30.00' }
                elseif ($catLower -eq 'tazas') { $price = 'S/ 20.00' }
                elseif ($catLower -eq 'bolsos') { $price = 'S/ 30.00' }
                elseif ($catLower -eq 'polos') { $price = 'S/ 40.00' }
                else { $price = 'S/ 0.00' }
                
                $productObj = @"
    {
        id: "$($catName)_$($prodName.Replace(' ', '_'))",
        category: "$catName",
        name: "$prodName",
        images: $imgArrayStr,
        price: '$price'
    }
"@
                $productsArray += $productObj
            }
        }
    }
} else {
    Write-Host "La carpeta assets\products no existe. Creando carpetas de ejemplo..."
    New-Item -Path $productsDir\bolsos -ItemType Directory -Force | Out-Null
    New-Item -Path $productsDir\camisas -ItemType Directory -Force | Out-Null
    New-Item -Path $productsDir\cuadernos -ItemType Directory -Force | Out-Null
    New-Item -Path $productsDir\polos -ItemType Directory -Force | Out-Null
    New-Item -Path $productsDir\tazas -ItemType Directory -Force | Out-Null
}

$jsContent = "window.STORE_PRODUCTS = [`n" + ($productsArray -join ",`n") + "`n];"
Set-Content -Path $outputFile -Value $jsContent -Encoding UTF8

Write-Host "Catálogo actualizado correctamente en products.js"
Start-Sleep -Seconds 2
