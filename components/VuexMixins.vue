<script>
	import {mapActions, mapMutations} from 'vuex';
	import * as types from '../store/mutation-type.js';
	export default {
		name: 'VuexMixins',
		methods: {
			...mapActions({
				'updateObject': types.UPDATE_OBJECT,
				'updateRedirect': types.UPDATE_REDIRECT
			})
		},
		computed: {
			db: function() {
				console.log(this.$store);
				return this.$store.state.db;
			}
		}
	}
</script>

<style>
</style>
