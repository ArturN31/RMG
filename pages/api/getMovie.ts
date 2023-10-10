import { NextApiRequest, NextApiResponse } from 'next';
import { ResponseFuncs } from '@/lib/types';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs;

	//function to catch errors
	const catcher = (error: Error) => res.status(400).json({ error });

	// Potential Responses
	const handleCase: ResponseFuncs = {
		// RESPONSE FOR GET REQUESTS
		GET: async (req: NextApiRequest, res: NextApiResponse) => {
			// res.json(await response.catch(catcher));
		},
		// RESPONSE POST REQUESTS
		POST: async (req: NextApiRequest, res: NextApiResponse) => {
			// res.json(await response.catch(catcher));
		},
	};

	// Check if there is a response for the particular method, if so invoke it, if not response with an error
	const response = handleCase[method];
	if (response) return response(req, res);
	else res.status(400).json({ error: 'No Response for This Request' });
};

export default handler;
