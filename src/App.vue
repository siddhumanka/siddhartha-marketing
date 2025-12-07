<template>
<div class="container">
<div class="header">
<div class="brand">
<div class="logo">SM</div>
<div>
<div class="title">Siddhartha Marketing</div>
<div class="subtitle">Wholesale adhesives & inventory — Akola</div>
</div>
</div>


<div class="controls">
<label class="small">Load CSV</label>
<input type="file" accept=".csv" @change="onFile" />
<button class="btn" @click="loadDefault">Load default /public/products.csv</button>
</div>
</div>


<div v-if="products.length === 0" style="padding:40px;border-radius:12px;background:white;box-shadow:0 6px 20px rgba(2,6,23,0.04);text-align:center">
<p style="font-size:18px;font-weight:600">No products loaded</p>
<p class="small">You can either drop your CSV using the file input or place `products.csv` in the `public/` folder and click "Load default".</p>
</div>


<div class="grid" v-else>
<div class="card" v-for="(p, idx) in products" :key="idx">
<img :src="p.image || placeholder" :alt="p.name || 'product image'" @error="onImgError($event)"/>


<div class="meta">
<div class="name">{{ p.name || 'Untitled Product' }}</div>
<div class="small">SKU: {{ p.sku || '-' }} • Category: {{ p.category || '-' }}</div>
<div class="price">{{ p.price ? formatPrice(p.price) : '-' }}</div>


<div class="tag-row">
<span class="tag" v-if="p.color">Color: {{ p.color }}</span>
<span class="tag" v-if="p.size">Size: {{ p.size }}</span>
<span class="tag" v-if="p.stock">Stock: {{ p.stock }}</span>
</div>
</div>
</script>
