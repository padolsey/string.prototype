/**
 * string.js
 * James Padolsey
 * http://james.padolsey.com
 * -
 * Some useful additional methods for String.prototype.
 */

(function(){
    
    var methods = {
        
        camelize: function() {
            
            /**
             * Returns string with all instances of
             * "-word" replaced with "Word", E.g.
             * "background-color" -> "backgroundColor"
             **/
            
            return this.replace(/\-(\w)/g, function( $0, $1 ) {
                return $1.toUpperCase();
            });
        
        },
        
        contains: function( what ) {
            
            /**
             * Returns boolean indicating whether
             * or not a substring exists within the string
             **/
            
            what = typeof what === 'string' ? what : what.toString();
            
            return this.indexOf( what ) > -1;
            
        },
        
        count: function( what ) {
            
            /**
             * Returns a number indicating how many times
             * a substring or regex is matched within the string
             **/
            
            if ( Object.prototype.toString.call(what) !== '[object RegExp]' ) {
                what = what.toString().replace(/\$\^\[\]\{\}\(\)\?\:\.\+\*/g, '\\$1');
            }
            
            what = RegExp( what ? what.source : '.', 'g' );
            
            return (this.match( what ) || []).length;
            
        },
        
        enclose: function( a, b ) {
            
            /**
             * Returns string with all instances
             * of -w replaced with W, e.g.
             * "background-color" -> "backgroundColor"
             **/
            
            return (a = a || '') + this + (b ? b : a);
            
        },
        
        extract: function( regex, n ) {
            
            /**
             * Matches the string against the passed regex
             * and the returns the group specified by _n_
             * 
             * E.g.
             *     ('hi @boo and @adam').extract(/@(\w+)/g, 1);
             *       => ['boo', 'adam']
             *       
             * If the regex is global then an array is returned
             * otherwise just the matched group is returned.
             **/
            
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
            
            /**
             * Runs the passed function on every character,
             * similar to Array.prototype.forEach
             **/
        
            var c, i = -1;
            
            while ( (c = this[++i]) ) {
                fn.call( this, c, i );
            }
            
            return true;
        
        },
        
        forEachWord: function( fn ) {
            
            /**
             * Runs the passed function on every word,
             * similar to Array.prototype.forEach
             **/
            
            var string = this,
                i = -1;
            
            string.replace(/\b([\w\-]+)\b/g, function( match, word ){
                fn.call( string, word, ++i );
                return match;
            });
            
            return true;
        
        },
        
        linkify: function( replacement ) {
            
            /**
             * Returns a string with all URLs replaced
             * with HTML anchor tags.
             **/
            
            return this.replace(/(^|\s)((?:f|ht)tps?:\/\/[^\s]+)/g, replacement || '$1<a href="$2">$2</a>');
            
        },
        
        many: function( n ) {
            
            /**
             * Returns a string which is made up of
             * _n_ instances of the original string.
             * E.g. "a".many(3) => "aaa"
             **/
            
            return Array(n ? n + 1 : 2).join(this);
            
        },
        
        randomize: function() {
            
            /**
             * Randomizes a string; messes up all the characters.
             * E.g. "abcdef".randomize() => "bcfdea"
             **/
            
            return this.split('').sort(function(){
                return Math.random() > 0.5 ? -1 : 1;
            }).join('');
            
        },
        
        remove: function( what ) {
            
            /**
             * Returns a string with all matches of
             * what (regex) removed.
             **/
            
            return this.replace( what || /./g, '' );
            
        },
        
        reverse: function() {
            
            /**
             * Returns the string, reversed.
             **/
            
            return this.split('').reverse().join('');
            
        },
        
        shorten: function( length, token ) {
            
            /**
             * Shortens the string by the specified amount
             * and appends the token.
             * E.g.
             * "this is a long sentance".shorten(10, '...');
             *  => "this is a ..."
             **/
            
            var substrd = this.substring( 0, length || this.length );
            
            return substrd + ( substrd === this ? '' : (token || '') );
            
        },
        
        sort: function() {
            
            /**
             * Runs the Array.sort() method on every
             * character of the string.
             **/
            
            return Array.prototype.sort.apply( this.split(''), arguments ).join('');
        
        },
        
        toDOM: function() {
            
            /**
             * Returns the DOM representation of the string,
             * in the form of an array of DOM nodes.
             **/
            
            var temp = document.createElement('div');
            temp.innerHTML = this;
            
            return Array.prototype.slice.call( div.childNodes );
            
        },
        
        trim: function() {
            
            /**
             * Returns the string with leading and
             * trailing spaces removed.
             **/
            
            return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
        
        },
        
        wrap: function( width, brk, cut ) {
            
            /**
             * Wraps the string.
             * E.g.
             * "the dog realllly wet".wrap(4, '<br/>')
             *  => "the <br/>dog <br/>realllly <br/>wet"
             **/
            
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