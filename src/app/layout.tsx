import AuthProvider from "@/components/SessionProvider";
import "./globals.css";
import Navbar from "@/components/navbar";
import QueryProvider from "@/components/QueryProvider";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className="bg-gray-100 text-gray-900">
				<AuthProvider>
					<QueryProvider>
						<Navbar />
						<main className="container mx-auto p-4">{children}</main>
					</QueryProvider>
				</AuthProvider>
			</body>
		</html>
	);
}
