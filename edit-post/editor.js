/**
 * WordPress dependencies
 */
import { withSelect } from '@wordpress/data';
import { EditorProvider, ErrorBoundary, PostLockedModal } from '@wordpress/editor';
import { StrictMode } from '@wordpress/element';
/**
 * Internal dependencies
 */
import Layout from './components/layout';

function Editor( { settings, hasFixedToolbar, post, isLocked, overridePost, onError, ...props } ) {
	if ( ! post ) {
		return null;
	}

	const editorSettings = {
		...settings,
		hasFixedToolbar,
	};

	return (
		<StrictMode>
			<EditorProvider settings={ editorSettings } post={ { ...post, ...overridePost } } { ...props }>
				<ErrorBoundary onError={ onError }>
					<Layout />
				</ErrorBoundary>
				{ isLocked && <PostLockedModal /> }
			</EditorProvider>
		</StrictMode>
	);
}

export default withSelect( ( select, { postId, postType } ) => ( {
	hasFixedToolbar: select( 'core/edit-post' ).isFeatureActive( 'fixedToolbar' ),
	post: select( 'core' ).getEntityRecord( 'postType', postType, postId ),
	isLocked: select( 'core/editor' ).isPostLocked(),
} ) )( Editor );
