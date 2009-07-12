(function(){
    
    var methods = {
        
        camelize: function() {
            
            return this.replace(/\-(\w)/g, function( $0, $1 ) {
                return $1.toUpperCase();
            });
        
        },
        
        contains: function( what ) {
            
            what = typeof what === 'string' ? what : what.toString();
            
            return this.indexOf( what ) > -1;
            
        },
        
        count: function( what ) {
            
            if ( Object.prototype.toString.call(what) !== '[object RegExp]' ) {
                what = what.toString().replace(/\$\^\[\]\{\}\(\)\?\:\.\+\*/g, '\\$1');
            }
            
            what = RegExp( what ? what.source : '.', 'g' );
            
            return (this.match( what ) || []).length;
            
        },
        
        enclose: function( a, b ) {
            
            return (a = a || '') + this + (b ? b : a);
            
        },
        
        extract: function( regex, n ) {
            
            n = n === undefined ? 0 : n;
            
            if ( !regex.global ) {
                return this.match(regex)[n] || '';
            }
            
            var match,
                extracted = [];
                
            while ( (match = regex.exec(this)) ) {
                extracted[extracted.length] = match[n] || '';
            }
            
            return extracted;
            
        },
        
        forEach: function( fn ) {
        
            var c, i = -1;
            
            while ( (c = this[++i]) ) {
                fn.call( this, c, i );
            }
            
            return true;
        
        },
        
        forEachWord: function( fn ) {
            
            var string = this,
                i = -1;
            
            string.replace(/\b([\w\-]+)\b/g, function( match, word ){
                fn.call( string, word, ++i );
                return match;
            });
            
            return true;
        
        },
        
        linkify: function( replacement ) {
            
            return this.replace(/(^|\s)((?:f|ht)tps?:\/\/[^\s]+)/g, replacement || '$1<a href="$2">$2</a>');
            
        },
        
        many: function( n ) {
            
            return Array(n ? n + 1 : 2).join(this);
            
        },
        
        randomize: function() {
            
            return this.split('').sort(function(){
                return Math.random() > 0.5 ? -1 : 1;
            }).join('');
            
        },
        
        remove: function( what ) {
            
            return this.replace( what || /./g, '' );
            
        },
        
        reverse: function() {
            
            return this.split('').reverse().join('');
            
        },
        
        shorten: function( length, token ) {
            
            var substrd = this.substring( 0, length || this.length );
            
            return substrd + ( substrd === this ? '' : (token || '') );
            
        },
        
        sort: function() {
            
            return Array.prototype.sort.apply( this.split(''), arguments ).join('');
        
        },
        
        toDOM: function() {
            
            var temp = document.createElement('div');
            temp.innerHTML = this;
            
            return Array.prototype.slice.call( div.childNodes );
            
        },
        
        trim: function() {
            
            return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
        
        },
        
        wrap: function( width, brk, cut ) {
            
            brk = brk || '\n';
            width = width || 75;
            cut = cut || false;
         
            if (!this) { return this; }
         
            var regex = '.{1,' +width+ '}(\\s|$)' + (cut ? '|.{' +width+ '}|.+$' : '|\\S+?(\\s|$)');
         
            return this.match( RegExp(regex, 'g') ).join( brk );
            
        }
        
    };
    
    /* This is where each method is added to String.prototype
       ( assuming it's not already there ) */
    for (var method in methods) {
        String.prototype[method] = String.prototype[method] || methods[method];
    }
    
})();