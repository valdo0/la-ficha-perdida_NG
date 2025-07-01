'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">frontned documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AdminPanelModule.html" data-type="entity-link" >AdminPanelModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AdminPanelModule-2ab785d2bb4ac6528e8371076055bb376c568aea3de5b8207ae3e87f0edb364c6fe6346254a1f06f1f2f3f85dd8da238cecdc6c5bb9f5cfbbffa7e822bdf27cb"' : 'data-bs-target="#xs-components-links-module-AdminPanelModule-2ab785d2bb4ac6528e8371076055bb376c568aea3de5b8207ae3e87f0edb364c6fe6346254a1f06f1f2f3f85dd8da238cecdc6c5bb9f5cfbbffa7e822bdf27cb"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AdminPanelModule-2ab785d2bb4ac6528e8371076055bb376c568aea3de5b8207ae3e87f0edb364c6fe6346254a1f06f1f2f3f85dd8da238cecdc6c5bb9f5cfbbffa7e822bdf27cb"' :
                                            'id="xs-components-links-module-AdminPanelModule-2ab785d2bb4ac6528e8371076055bb376c568aea3de5b8207ae3e87f0edb364c6fe6346254a1f06f1f2f3f85dd8da238cecdc6c5bb9f5cfbbffa7e822bdf27cb"' }>
                                            <li class="link">
                                                <a href="components/AdminPanelComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminPanelComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AdminPanelRoutingModule.html" data-type="entity-link" >AdminPanelRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-aa9bd88109492fb02ca7277859fcdbbdc89516ad42dd21f4a4547e4adaddd950253b5e767e91006c35921f0c6520d853c80c2df545a0d9110ba41d4cd2bc2063"' : 'data-bs-target="#xs-components-links-module-AppModule-aa9bd88109492fb02ca7277859fcdbbdc89516ad42dd21f4a4547e4adaddd950253b5e767e91006c35921f0c6520d853c80c2df545a0d9110ba41d4cd2bc2063"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-aa9bd88109492fb02ca7277859fcdbbdc89516ad42dd21f4a4547e4adaddd950253b5e767e91006c35921f0c6520d853c80c2df545a0d9110ba41d4cd2bc2063"' :
                                            'id="xs-components-links-module-AppModule-aa9bd88109492fb02ca7277859fcdbbdc89516ad42dd21f4a4547e4adaddd950253b5e767e91006c35921f0c6520d853c80c2df545a0d9110ba41d4cd2bc2063"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CarritoModule.html" data-type="entity-link" >CarritoModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-CarritoModule-06d969aac08eee4e7421bb00150c76f031c9883b6d64ae4a3e0162b853f16ee87936785652e5c19914cf1bb280430bbf8fa4a4c5c3e51f25fbea0b21681c7994"' : 'data-bs-target="#xs-components-links-module-CarritoModule-06d969aac08eee4e7421bb00150c76f031c9883b6d64ae4a3e0162b853f16ee87936785652e5c19914cf1bb280430bbf8fa4a4c5c3e51f25fbea0b21681c7994"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CarritoModule-06d969aac08eee4e7421bb00150c76f031c9883b6d64ae4a3e0162b853f16ee87936785652e5c19914cf1bb280430bbf8fa4a4c5c3e51f25fbea0b21681c7994"' :
                                            'id="xs-components-links-module-CarritoModule-06d969aac08eee4e7421bb00150c76f031c9883b6d64ae4a3e0162b853f16ee87936785652e5c19914cf1bb280430bbf8fa4a4c5c3e51f25fbea0b21681c7994"' }>
                                            <li class="link">
                                                <a href="components/CarritoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CarritoComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CarritoRoutingModule.html" data-type="entity-link" >CarritoRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CategoriaProductoModule.html" data-type="entity-link" >CategoriaProductoModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-CategoriaProductoModule-31109821cc8604bbd1ec89486a5702dfb951840aaead32a46b36a0c266d0347e55cea56f467bf2a50117f08cd0eb90ef15587ae2d7466448f6ff1a23df84b4c7"' : 'data-bs-target="#xs-components-links-module-CategoriaProductoModule-31109821cc8604bbd1ec89486a5702dfb951840aaead32a46b36a0c266d0347e55cea56f467bf2a50117f08cd0eb90ef15587ae2d7466448f6ff1a23df84b4c7"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CategoriaProductoModule-31109821cc8604bbd1ec89486a5702dfb951840aaead32a46b36a0c266d0347e55cea56f467bf2a50117f08cd0eb90ef15587ae2d7466448f6ff1a23df84b4c7"' :
                                            'id="xs-components-links-module-CategoriaProductoModule-31109821cc8604bbd1ec89486a5702dfb951840aaead32a46b36a0c266d0347e55cea56f467bf2a50117f08cd0eb90ef15587ae2d7466448f6ff1a23df84b4c7"' }>
                                            <li class="link">
                                                <a href="components/CategoriaProductoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoriaProductoComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CategoriaProductoRoutingModule.html" data-type="entity-link" >CategoriaProductoRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ComponentsModule.html" data-type="entity-link" >ComponentsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ComponentsModule-7550af7ff20c6c00ba7e14f696041d280e35f8db475e8c8479295e24a9a5135d50bd70ac764530ee5a695ccc77baa6ea8410273959170872692141a12f89d991"' : 'data-bs-target="#xs-components-links-module-ComponentsModule-7550af7ff20c6c00ba7e14f696041d280e35f8db475e8c8479295e24a9a5135d50bd70ac764530ee5a695ccc77baa6ea8410273959170872692141a12f89d991"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ComponentsModule-7550af7ff20c6c00ba7e14f696041d280e35f8db475e8c8479295e24a9a5135d50bd70ac764530ee5a695ccc77baa6ea8410273959170872692141a12f89d991"' :
                                            'id="xs-components-links-module-ComponentsModule-7550af7ff20c6c00ba7e14f696041d280e35f8db475e8c8479295e24a9a5135d50bd70ac764530ee5a695ccc77baa6ea8410273959170872692141a12f89d991"' }>
                                            <li class="link">
                                                <a href="components/FooterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeaderComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HomeModule.html" data-type="entity-link" >HomeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-HomeModule-05c7153668962fe98854b4e649f17604076d3f0592e31e298df468aea404dbba6c47a6d5d0beb4ba6a0b7aec54827e63d2a63ecca86d7169a0bd87354237c1d2"' : 'data-bs-target="#xs-components-links-module-HomeModule-05c7153668962fe98854b4e649f17604076d3f0592e31e298df468aea404dbba6c47a6d5d0beb4ba6a0b7aec54827e63d2a63ecca86d7169a0bd87354237c1d2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HomeModule-05c7153668962fe98854b4e649f17604076d3f0592e31e298df468aea404dbba6c47a6d5d0beb4ba6a0b7aec54827e63d2a63ecca86d7169a0bd87354237c1d2"' :
                                            'id="xs-components-links-module-HomeModule-05c7153668962fe98854b4e649f17604076d3f0592e31e298df468aea404dbba6c47a6d5d0beb4ba6a0b7aec54827e63d2a63ecca86d7169a0bd87354237c1d2"' }>
                                            <li class="link">
                                                <a href="components/HomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HomeRoutingModule.html" data-type="entity-link" >HomeRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LoginModule.html" data-type="entity-link" >LoginModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-LoginModule-5116cd546f5f118dc9f6e38a3bc839a9061311bae702cb98036655e46de014fbbb6df542cc142c024acdaed6b30e7987eea4849133efd50752796d0e01d765cd"' : 'data-bs-target="#xs-components-links-module-LoginModule-5116cd546f5f118dc9f6e38a3bc839a9061311bae702cb98036655e46de014fbbb6df542cc142c024acdaed6b30e7987eea4849133efd50752796d0e01d765cd"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LoginModule-5116cd546f5f118dc9f6e38a3bc839a9061311bae702cb98036655e46de014fbbb6df542cc142c024acdaed6b30e7987eea4849133efd50752796d0e01d765cd"' :
                                            'id="xs-components-links-module-LoginModule-5116cd546f5f118dc9f6e38a3bc839a9061311bae702cb98036655e46de014fbbb6df542cc142c024acdaed6b30e7987eea4849133efd50752796d0e01d765cd"' }>
                                            <li class="link">
                                                <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LoginRoutingModule.html" data-type="entity-link" >LoginRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PerfilModule.html" data-type="entity-link" >PerfilModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-PerfilModule-c1d4a69e79c29cf78355c6e569764e4fb8fa408e9d445958e953f1ed23d9ad34ec4c819e463505f28136aad1463a6a31d4330faf0e4ee62c007d076211e391c5"' : 'data-bs-target="#xs-components-links-module-PerfilModule-c1d4a69e79c29cf78355c6e569764e4fb8fa408e9d445958e953f1ed23d9ad34ec4c819e463505f28136aad1463a6a31d4330faf0e4ee62c007d076211e391c5"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PerfilModule-c1d4a69e79c29cf78355c6e569764e4fb8fa408e9d445958e953f1ed23d9ad34ec4c819e463505f28136aad1463a6a31d4330faf0e4ee62c007d076211e391c5"' :
                                            'id="xs-components-links-module-PerfilModule-c1d4a69e79c29cf78355c6e569764e4fb8fa408e9d445958e953f1ed23d9ad34ec4c819e463505f28136aad1463a6a31d4330faf0e4ee62c007d076211e391c5"' }>
                                            <li class="link">
                                                <a href="components/PerfilComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PerfilComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PerfilRoutingModule.html" data-type="entity-link" >PerfilRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/RecuperarPwModule.html" data-type="entity-link" >RecuperarPwModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-RecuperarPwModule-aff75bf8f24ac1432e91e13ed1e078b6500da28d250c47b2e162c8abc1f2944bc20de775577833eedf0abcd7fae6e434c7da247d715cad1641a12bd7b7f7cbd9"' : 'data-bs-target="#xs-components-links-module-RecuperarPwModule-aff75bf8f24ac1432e91e13ed1e078b6500da28d250c47b2e162c8abc1f2944bc20de775577833eedf0abcd7fae6e434c7da247d715cad1641a12bd7b7f7cbd9"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RecuperarPwModule-aff75bf8f24ac1432e91e13ed1e078b6500da28d250c47b2e162c8abc1f2944bc20de775577833eedf0abcd7fae6e434c7da247d715cad1641a12bd7b7f7cbd9"' :
                                            'id="xs-components-links-module-RecuperarPwModule-aff75bf8f24ac1432e91e13ed1e078b6500da28d250c47b2e162c8abc1f2944bc20de775577833eedf0abcd7fae6e434c7da247d715cad1641a12bd7b7f7cbd9"' }>
                                            <li class="link">
                                                <a href="components/RecuperarPwComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RecuperarPwComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/RecuperarPwRoutingModule.html" data-type="entity-link" >RecuperarPwRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/RegistroModule.html" data-type="entity-link" >RegistroModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-RegistroModule-e30e9fc74732ac10e7dd5ca54a3396a3bfa32e97f72ecd796b6f6ddcc952d0417d319c41fc5962f0ddf246a579f9e3a3110c8f3260557c60b10df93823c45a74"' : 'data-bs-target="#xs-components-links-module-RegistroModule-e30e9fc74732ac10e7dd5ca54a3396a3bfa32e97f72ecd796b6f6ddcc952d0417d319c41fc5962f0ddf246a579f9e3a3110c8f3260557c60b10df93823c45a74"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RegistroModule-e30e9fc74732ac10e7dd5ca54a3396a3bfa32e97f72ecd796b6f6ddcc952d0417d319c41fc5962f0ddf246a579f9e3a3110c8f3260557c60b10df93823c45a74"' :
                                            'id="xs-components-links-module-RegistroModule-e30e9fc74732ac10e7dd5ca54a3396a3bfa32e97f72ecd796b6f6ddcc952d0417d319c41fc5962f0ddf246a579f9e3a3110c8f3260557c60b10df93823c45a74"' }>
                                            <li class="link">
                                                <a href="components/RegistroComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RegistroComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/RegistroRoutingModule.html" data-type="entity-link" >RegistroRoutingModule</a>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CarritoService.html" data-type="entity-link" >CarritoService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CategoriaService.html" data-type="entity-link" >CategoriaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProductoService.html" data-type="entity-link" >ProductoService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/CarritoItem.html" data-type="entity-link" >CarritoItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Categoria.html" data-type="entity-link" >Categoria</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Producto.html" data-type="entity-link" >Producto</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});