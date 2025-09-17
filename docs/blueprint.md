# **App Name**: Suvidha Insights

## Core Features:

- Admin Authentication: Authenticate admins based on their email domain using Firebase Authentication. Only whitelisted domains (roads.com, electricity.com, wastemanagement.com, publictransport.com, central.com) can log in. Automatically assigns department role based on the email domain.
- Issue Dashboard: Display reported issues in a table and map view, pulling data directly from the shared Firestore database connected to the Suvidha mobile app. Display key details: title, description, category, severity, location, (optionally) author, creation date, status, and upvotes.
- Role-Based Access Control: Implement RBAC to filter issues based on the admin's department. Roads, Electricity, Waste Management, and Public Transport admins only see issues in their respective categories. Central Admin views all issues.
- Issue Filtering and Sorting: Enable filtering issues by location, problem ID, or keywords via a search bar. Allow sorting by Newest, Most Severe, In-Progress, and Resolved.
- Issue Update Management: Allow admins to update issue status (Acknowledged, In-Progress, Resolved, Irrelevant) and add updates to the `updates` array (date, description, status). An optional text field to assign tasks internally. For central admins the tool allows for reassigning an issue to another department.
- Central Admin Analytics: Provide a visual analytics view for Central Admin with charts showing issue counts by category, severity distribution, and response times. Include a heatmap of issue locations.

## Style Guidelines:

- Primary color: Light blue (#4FC3F7) to maintain consistency with the Suvidha mobile app, evoking trust.
- Background color: Very light blue (#E0F7FA), close to white but visually distinct from surrounding pages.
- Accent color: Slightly darker blue (#03A9F4) to highlight interactive elements and call-to-actions.
- Headline font: 'Poppins' sans-serif font, for headlines and titles.
- Body font: 'PT Sans' a slightly warmer, more readable font for body text and descriptions.
- Use Material Design icons consistently throughout the dashboard for a clean, recognizable look.
- Employ a clean, card-based layout to display issues and information. Implement a sidebar navigation with links to Dashboard, My Department Issues, Analytics (Central Admin only), and Settings.