import { useEffect, useState } from "react";
import {
	Box,
	Card,
	CardContent,
	Typography,
	Button,
	Grid,
	TextField
} from "@mui/material";
import APIQuery from "../API/APIQuery";
import { useNavigate, useParams } from 'react-router-dom'

/**
 * Component for rendering search results. 
 * @param {*} param0 JWT.
 * @returns Component containing search results in Card format, as well as a message
 * 			displaying "Loading" or "No Results Found". 
 */
export default function Search({ token }) {
	let navigate = useNavigate();
	let { searchTerm } = useParams();
	/**
	 * Boolean for whether the search request to the API has completed. Used for
	 *  rendering a loading message versus a "no results found" message. 
	 */
	const [searchComplete, setSearchComplete] = useState('');
	const [searchResults, setSearchResults] = useState();
	useEffect(() => { FetchSearchResults(); }, []);
	/**
	 * Submits an API call searching user and group names for the search term. 
	 */
	const FetchSearchResults = async () => {
		setSearchComplete('');
		const response = await APIQuery.get(
			`/search/name/${searchTerm}`,
			{ headers: { "Authorization": "Bearer " + token } }
		).then(resp => resp);
		setSearchResults(response.data);
		setSearchComplete('true');
	}
	return (
		<Box>
			{(searchResults && searchResults[0]) ? (
				searchResults.map((x) => {
					return (SearchResultCard(x, navigate))
				})
			) : (
				searchComplete ? (
					<div>No Results Found</div>
				) : (
					<div>Loading Results</div>
				)
			)}
		</Box>
	)
}

/**
 * Provides a mappable page element for search results. At this time of this comment (220105)
 *  functions to map DisplayName or GroupName (whichever is appropriate for the result) to a 
 *  Card element that redirects the user to the appropriate Page on click. 
 * Future development - include profile/wall picture; include marker of User vs Group. 
 * @param {Object} x Object corresponding to a SearchResultItem returned from the backend. 
 * @param {Function} navigate useNavigate hook from exported function (React didn't like it
* 							  when I made a separate one inside this method).
 * @returns A Card element labeled with the SearchResultItem name that redirects the user to 
 * 			the appropriate Page on click. 
 */
function SearchResultCard(x, navigate) {
	function handleClickSearchResult() {
		if (x.type == "USER") {
			navigate(`/user/${x.id}`);
		}
		if (x.type == "GROUP") {
			navigate(`/group/${x.id}`);
		}
	}
	return (
		<Card sx={{ minWidth: 275 }} onClick={handleClickSearchResult}>
			<CardContent>
				<Typography variant="h5">
					{x.name}
				</Typography>
			</CardContent>
		</Card>
	)
}